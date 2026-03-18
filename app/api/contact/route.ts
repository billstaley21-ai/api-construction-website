import { NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  projectType: z.string().min(1),
  message: z.string().min(10),
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function getBodyData(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await request.json();
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const formData = await request.formData();

    return {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      projectType: String(formData.get("projectType") || ""),
      message: String(formData.get("message") || ""),
    };
  }

  return {};
}

export async function POST(request: Request) {
  try {
    const body = await getBodyData(request);
    const parsed = schema.safeParse(body);

    const contentType = request.headers.get("content-type") || "";
    const isBrowserFormPost =
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data");

    if (!parsed.success) {
      if (isBrowserFormPost) {
        return NextResponse.redirect(
          new URL("/?quote=invalid#quote", request.url),
          303
        );
      }

      return NextResponse.json(
        { error: "Please complete all required fields correctly." },
        { status: 400 }
      );
    }

    const { name, phone, email, projectType, message } = parsed.data;

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      process.env.FROM_EMAIL ||
      "onboarding@resend.dev";
    const toEmail =
      process.env.CONTACT_TO_EMAIL ||
      process.env.TO_EMAIL ||
      "apiconstructionprovo@gmail.com";

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY");
      if (isBrowserFormPost) {
        return NextResponse.redirect(
          new URL("/?quote=error#quote", request.url),
          303
        );
      }

      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const subject = `New API Construction Lead: ${projectType}`;

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
          ${escapeHtml(message).replace(/\n/g, "<br>")}
        </div>
      </div>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      html,
    });

    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_FROM_NUMBER;
    const twilioTo = process.env.TWILIO_TO_NUMBER;

    if (twilioSid && twilioToken && twilioFrom && twilioTo) {
      try {
        const client = twilio(twilioSid, twilioToken);

        await client.messages.create({
          from: twilioFrom,
          to: twilioTo,
          body:
            `New API Construction lead\n` +
            `Name: ${name}\n` +
            `Phone: ${phone}\n` +
            `Email: ${email}\n` +
            `Project: ${projectType}\n` +
            `Message: ${message}`,
        });
      } catch (smsError) {
        console.error("Twilio SMS failed:", smsError);
      }
    }

    if (isBrowserFormPost) {
      return NextResponse.redirect(
        new URL("/?quote=success#quote", request.url),
        303
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    const contentType = request.headers.get("content-type") || "";
    const isBrowserFormPost =
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data");

    if (isBrowserFormPost) {
      return NextResponse.redirect(
        new URL("/?quote=error#quote", request.url),
        303
      );
    }

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

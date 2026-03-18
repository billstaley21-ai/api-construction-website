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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const { name, phone, email, projectType, message } = parsed.data;

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    if (!process.env.CONTACT_TO_EMAIL) {
      return NextResponse.json(
        { error: "Missing CONTACT_TO_EMAIL" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      "A.P.I. Construction <onboarding@resend.dev>";

    const siteUrl =
      process.env.SITE_URL || "https://api-construction-website.vercel.app";

    const logoUrl = `${siteUrl}/assets/api-logo-new.png`;

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeProjectType = escapeHtml(projectType);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const adminHtml = `
      <div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <div style="max-width:680px;margin:0 auto;padding:32px 16px;">
          <div style="background:#0f172a;border-radius:16px 16px 0 0;padding:24px 32px;text-align:center;">
            <img src="${logoUrl}" alt="A.P.I. Construction" style="max-width:240px;height:auto;display:block;margin:0 auto 16px;" />
            <div style="font-size:24px;line-height:1.2;font-weight:700;color:#ffffff;">New Website Lead</div>
            <div style="margin-top:8px;font-size:14px;color:#cbd5e1;">A new customer inquiry just came in from your website.</div>
          </div>

          <div style="background:#ffffff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;padding:32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;width:160px;font-weight:700;color:#334155;">Name</td>
                <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#111827;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#334155;">Phone</td>
                <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#111827;">${safePhone}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#334155;">Email</td>
                <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#111827;">${safeEmail}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#334155;">Project Type</td>
                <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#111827;">${safeProjectType}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;vertical-align:top;font-weight:700;color:#334155;">Message</td>
                <td style="padding:12px 0;color:#111827;">${safeMessage}</td>
              </tr>
            </table>

            <div style="margin-top:32px;padding:20px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;">
              <div style="font-size:14px;color:#475569;margin-bottom:8px;">Recommended next step</div>
              <div style="font-size:16px;font-weight:700;color:#0f172a;">Reach out as quickly as possible to improve close rate.</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const customerHtml = `
      <div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <div style="max-width:680px;margin:0 auto;padding:32px 16px;">
          <div style="background:#0f172a;border-radius:16px 16px 0 0;padding:24px 32px;text-align:center;">
            <img src="${logoUrl}" alt="A.P.I. Construction" style="max-width:240px;height:auto;display:block;margin:0 auto 16px;" />
            <div style="font-size:24px;line-height:1.2;font-weight:700;color:#ffffff;">We Received Your Request</div>
            <div style="margin-top:8px;font-size:14px;color:#cbd5e1;">Thanks for contacting A.P.I. Construction.</div>
          </div>

          <div style="background:#ffffff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;padding:32px;">
            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#111827;">Hi ${safeName},</p>

            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#111827;">
              Thanks for reaching out to <strong>A.P.I. Construction</strong>. We’ve received your request for
              <strong>${safeProjectType}</strong> work and a team member will follow up shortly.
            </p>

            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#111827;">
              We take pride in delivering high-quality work, fair pricing, and a clean, professional experience from start to finish.
            </p>

            <div style="margin:24px 0;padding:20px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;">
              <div style="font-size:14px;color:#475569;margin-bottom:6px;">Need immediate help?</div>
              <div style="font-size:18px;font-weight:700;color:#0f172a;">Call or text us at 801-425-1766</div>
            </div>

            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#111827;">
              We appreciate the opportunity to earn your business.
            </p>

            <p style="margin:24px 0 0;font-size:16px;line-height:1.7;color:#111827;">
              — A.P.I. Construction
            </p>
          </div>
        </div>
      </div>
    `;

    try {
      const adminResponse = await resend.emails.send({
        from: fromEmail,
        to: [process.env.CONTACT_TO_EMAIL],
        replyTo: email,
        subject: `New ${projectType} lead from ${name}`,
        html: adminHtml,
        text: [
          "New website lead",
          `Name: ${name}`,
          `Phone: ${phone}`,
          `Email: ${email}`,
          `Project Type: ${projectType}`,
          `Message: ${message}`,
        ].join("\n"),
      });

      console.log("ADMIN EMAIL SENT:", adminResponse);

      const autoReplyResponse = await resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: "We received your request – A.P.I. Construction",
        html: customerHtml,
        text: [
          `Hi ${name},`,
          "",
          "Thanks for reaching out to A.P.I. Construction.",
          `We’ve received your request for ${projectType} work and will be in touch shortly.`,
          "",
          "If this is urgent, call or text us at 801-425-1766.",
          "",
          "We appreciate the opportunity to earn your business.",
          "",
          "– A.P.I. Construction",
        ].join("\n"),
      });

      console.log("AUTO REPLY SENT:", autoReplyResponse);
    } catch (error) {
      console.error("EMAIL ERROR:", error);

      return NextResponse.json(
        { error: "Email failed to send", details: error },
        { status: 500 }
      );
    }

    if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_FROM_NUMBER &&
      process.env.TWILIO_TO_NUMBER
    ) {
      try {
        const client = twilio(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_AUTH_TOKEN
        );

        await client.messages.create({
          from: process.env.TWILIO_FROM_NUMBER,
          to: process.env.TWILIO_TO_NUMBER,
          body: `API Construction lead: ${name} | ${projectType} | ${phone} | ${email}`,
        });

        console.log("SMS SENT");
      } catch (error) {
        console.error("SMS ERROR:", error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("GENERAL ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

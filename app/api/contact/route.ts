import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  projectType: z.string().min(1),
  message: z.string().min(5),
});

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function parseRequestBody(request: Request) {
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

function getAdminEmailHtml(data: {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
  logoUrl: string;
}) {
  return `
  <div style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#18222f;">
    <div style="max-width:680px;margin:0 auto;padding:32px 16px;">
      <div style="background:#0d1b2a;border-radius:24px 24px 0 0;padding:28px 32px;text-align:center;">
        <img src="${data.logoUrl}" alt="A.P.I. Construction" style="max-width:160px;height:auto;margin:0 auto 14px;display:block;" />
        <div style="color:#f4d183;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">
          New Website Lead
        </div>
        <h1 style="margin:12px 0 0;color:#ffffff;font-size:28px;line-height:1.1;">
          New Quote Request Submitted
        </h1>
      </div>

      <div style="background:#ffffff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 24px 24px;padding:32px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
          <tr>
            <td style="padding:0 0 16px;">
              <div style="font-size:13px;color:#617186;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Customer Name</div>
              <div style="font-size:18px;color:#0d1b2a;font-weight:700;">${escapeHtml(data.name)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 16px;">
              <div style="font-size:13px;color:#617186;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Phone</div>
              <div style="font-size:16px;color:#18222f;">${escapeHtml(data.phone)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 16px;">
              <div style="font-size:13px;color:#617186;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Email</div>
              <div style="font-size:16px;color:#18222f;">${escapeHtml(data.email)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 16px;">
              <div style="font-size:13px;color:#617186;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Project Type</div>
              <div style="font-size:16px;color:#18222f;">${escapeHtml(data.projectType)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0 0;">
              <div style="font-size:13px;color:#617186;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Project Details</div>
              <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:16px;padding:16px;font-size:15px;line-height:1.6;color:#18222f;">
                ${escapeHtml(data.message).replace(/\n/g, "<br>")}
              </div>
            </td>
          </tr>
        </table>

        <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e5e7eb;font-size:13px;color:#617186;">
          Submitted from apiconstructionutah.com
        </div>
      </div>
    </div>
  </div>
  `;
}

function getCustomerEmailHtml(data: {
  name: string;
  projectType: string;
  message: string;
  logoUrl: string;
}) {
  return `
  <div style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#18222f;">
    <div style="max-width:680px;margin:0 auto;padding:32px 16px;">
      <div style="background:#0d1b2a;border-radius:24px 24px 0 0;padding:32px;text-align:center;">
        <img src="${data.logoUrl}" alt="A.P.I. Construction" style="max-width:180px;height:auto;margin:0 auto 16px;display:block;" />
        <div style="color:#f0d49a;font-size:12px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">
          Quote Request Received
        </div>
        <h1 style="margin:14px 0 0;color:#ffffff;font-size:30px;line-height:1.1;">
          Thanks for reaching out, ${escapeHtml(data.name)}.
        </h1>
      </div>

      <div style="background:#ffffff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 24px 24px;padding:32px;">
        <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#334155;">
          We received your request and will review your project details shortly.
          A member of our team will reach out as soon as possible to discuss scope,
          timing, and next steps.
        </p>

        <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:18px;padding:20px;margin:24px 0;">
          <div style="font-size:13px;color:#617186;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">
            Your Request
          </div>
          <div style="font-size:16px;color:#0d1b2a;margin-bottom:10px;">
            <strong>Project Type:</strong> ${escapeHtml(data.projectType)}
          </div>
          <div style="font-size:15px;line-height:1.6;color:#334155;">
            ${escapeHtml(data.message).replace(/\n/g, "<br>")}
          </div>
        </div>

        <div style="background:linear-gradient(135deg,#0d1b2a 0%,#13263b 100%);border-radius:18px;padding:24px;color:#ffffff;">
          <div style="font-size:22px;font-weight:700;margin-bottom:8px;">
            Need to reach us sooner?
          </div>
          <div style="font-size:16px;line-height:1.6;color:rgba(255,255,255,0.86);margin-bottom:14px;">
            Call us directly and we’ll be happy to talk through your project.
          </div>
          <div style="font-size:24px;font-weight:700;color:#f4d183;">
            (801) 425-1766
          </div>
        </div>

        <p style="margin:24px 0 0;font-size:15px;line-height:1.7;color:#475569;">
          We appreciate the opportunity to earn your business.
        </p>

        <p style="margin:18px 0 0;font-size:15px;line-height:1.7;color:#0d1b2a;font-weight:700;">
          — A.P.I. Construction
        </p>
        <p style="margin:6px 0 0;font-size:14px;line-height:1.6;color:#617186;">
          Concrete • Stucco • Siding<br>
          Orem, Utah
        </p>
      </div>
    </div>
  </div>
  `;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const isBrowserFormPost =
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data");

  try {
    const body = await parseRequestBody(request);
    const parsed = schema.safeParse(body);

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

    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      process.env.FROM_EMAIL ||
      "onboarding@resend.dev";

    const toEmail =
      process.env.CONTACT_TO_EMAIL ||
      process.env.TO_EMAIL ||
      "apiconstructionprovo@gmail.com";

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://apiconstructionutah.com";

    const logoUrl = `${siteUrl}/assets/api-logo-transparent.png`;

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New Quote Request - ${name}`,
      html: getAdminEmailHtml({
        name,
        phone,
        email,
        projectType,
        message,
        logoUrl,
      }),
    });

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "We received your request - A.P.I. Construction",
      html: getCustomerEmailHtml({
        name,
        projectType,
        message,
        logoUrl,
      }),
    });

    if (isBrowserFormPost) {
      return NextResponse.redirect(
        new URL("/?quote=success#quote", request.url),
        303
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

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

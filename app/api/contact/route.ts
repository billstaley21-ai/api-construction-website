import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// -------------------------
// VALIDATION
// -------------------------
const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  projectType: z.string().min(1),
  message: z.string().min(5),
});

// -------------------------
// HELPERS
// -------------------------
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

  const formData = await request.formData();

  return {
    name: String(formData.get("name") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    projectType: String(formData.get("projectType") || ""),
    message: String(formData.get("message") || ""),
  };
}

// -------------------------
// EMAIL TEMPLATES
// -------------------------
function adminEmail(data: any) {
  return `
  <div style="background:#f4f7fb;padding:30px;font-family:Arial;">
    <div style="max-width:650px;margin:auto;background:white;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.1);">
      
      <div style="background:#0d1b2a;padding:25px;text-align:center;">
        <img src="${data.logo}" style="max-width:220px;margin-bottom:10px;" />
        <h2 style="color:white;margin:0;">New Quote Request</h2>
      </div>

      <div style="padding:25px;">
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Project Type:</strong> ${escapeHtml(data.projectType)}</p>

        <div style="margin-top:20px;padding:15px;background:#f8fafc;border-radius:10px;">
          ${escapeHtml(data.message)}
        </div>
      </div>
    </div>
  </div>
  `;
}

function customerEmail(data: any) {
  return `
  <div style="background:#f4f7fb;padding:30px;font-family:Arial;">
    <div style="max-width:650px;margin:auto;background:white;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.1);">
      
      <div style="background:#0d1b2a;padding:30px;text-align:center;">
        <img src="${data.logo}" style="max-width:220px;margin-bottom:12px;" />
        <h2 style="color:white;margin:0;">Thanks, ${escapeHtml(data.name)} 👋</h2>
      </div>

      <div style="padding:30px;">
        <p style="font-size:16px;">
          We received your request and will reach out shortly to go over your project.
        </p>

        <div style="margin:25px 0;padding:20px;background:#f8fafc;border-radius:12px;">
          <p><strong>Project:</strong> ${escapeHtml(data.projectType)}</p>
          <p>${escapeHtml(data.message)}</p>
        </div>

        <div style="background:#0d1b2a;color:white;padding:20px;border-radius:12px;text-align:center;">
          <p style="margin:0;">Need immediate help?</p>
          <p style="font-size:20px;font-weight:bold;margin:8px 0;">
            📞 (801) 425-1766
          </p>
        </div>

        <p style="margin-top:25px;">
          — A.P.I. Construction<br/>
          Concrete • Stucco • Siding
        </p>
      </div>
    </div>
  </div>
  `;
}

// -------------------------
// MAIN HANDLER
// -------------------------
export async function POST(request: Request) {
  try {
    const body = await parseRequestBody(request);
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.redirect(
        new URL("/?quote=invalid#quote", request.url),
        303
      );
    }

    const { name, phone, email, projectType, message } = parsed.data;

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://apiconstructionutah.com";

    const logo = `${siteUrl}/assets/api-logo-new.png`;

    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    const toEmail =
      process.env.CONTACT_TO_EMAIL || "apiconstructionprovo@gmail.com";

    // SEND TO YOU
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Quote Request - ${name}`,
      html: adminEmail({ name, phone, email, projectType, message, logo }),
    });

    // AUTO RESPONSE
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "We received your request - A.P.I. Construction",
      html: customerEmail({ name, projectType, message, logo }),
    });

    return NextResponse.redirect(
      new URL("/?quote=success#quote", request.url),
      303
    );
  } catch (err) {
    console.error(err);

    return NextResponse.redirect(
      new URL("/?quote=error#quote", request.url),
      303
    );
  }
}

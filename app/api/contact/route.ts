import { NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";
import { z } from "zod";

// Validation schema
const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  projectType: z.string().min(1),
  message: z.string().min(10),
});

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

    // Validate env vars
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

    // ✅ SEND EMAIL
    try {
      const response = await resend.emails.send({
        from: fromEmail,
        to: [process.env.CONTACT_TO_EMAIL],
        replyTo: email,
        subject: `New ${projectType} lead from ${name}`,
        text: [
          `New website lead`,
          `Name: ${name}`,
          `Phone: ${phone}`,
          `Email: ${email}`,
          `Project Type: ${projectType}`,
          `Message: ${message}`,
        ].join("\n"),
      });

      console.log("EMAIL SENT:", response);
    } catch (error) {
      console.error("EMAIL ERROR:", error);

      return NextResponse.json(
        { error: "Email failed to send", details: error },
        { status: 500 }
      );
    }

    // ✅ OPTIONAL SMS (Twilio)
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

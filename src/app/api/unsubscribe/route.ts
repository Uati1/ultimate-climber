import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    const notifyTo = process.env.NOTIFY_EMAIL || "hello@ultimateclimber.com";
    const from =
      process.env.RESEND_FROM || "Ultimate Climber <notifications@ultimateclimber.com>";

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: notifyTo,
      subject: `[Unsubscribe] User requested removal - ${email}`,
      html: `
        <h2>Unsubscribe Request</h2>
        <p><strong>Email to remove:</strong> ${email}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">Sent from Ultimate Climber landing</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Unsubscribe API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

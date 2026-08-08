import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!accessKey) {
      // If no key is set yet, return structured response so frontend can show mailto option or instructions
      return NextResponse.json(
        {
          success: false,
          missingKey: true,
          error: "WEB3FORMS_ACCESS_KEY is not configured in environment variables.",
        },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        replyto: email, // Sets Reply-To in Gmail so Matthew can reply directly
        subject: subject
          ? `Portfolio Message: ${subject} (from ${name})`
          : `Portfolio Message from ${name}`,
        message: message,
        from_name: `${name} via MattieTech Portfolio`,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully! Matthew will receive your email directly.",
      });
    } else {
      return NextResponse.json(
        { success: false, error: data.message || "Failed to send message via email service." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while sending your message." },
      { status: 500 }
    );
  }
}

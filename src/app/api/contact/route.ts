import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

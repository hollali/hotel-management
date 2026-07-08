import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  return NextResponse.json({
    userId: session.userId,
    sessionClaims: session.sessionClaims,
  });
}

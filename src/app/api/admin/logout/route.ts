import { destroyAdminSession } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export async function POST() {
  await destroyAdminSession();
  return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_URL || "http://localhost:3000"));
}

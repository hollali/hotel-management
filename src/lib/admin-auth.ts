import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE_MS = 60 * 60 * 8 * 1000;

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_SECRET must be configured in production");
    }
    return "default-secret-change-me";
  }
  return secret;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export async function createAdminSession(username: string) {
  const payload = `${username}:${Date.now()}`;
  const token = `${payload}.${sign(payload)}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

export async function verifyAdminSession(): Promise<boolean> {
  if (process.env.NODE_ENV === "production" && !process.env.ADMIN_SECRET) {
    return false;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;

  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  const expected = sign(payload);

  if (!safeEqual(signature, expected)) {
    return false;
  }

  const separator = payload.lastIndexOf(":");
  if (separator === -1) return false;

  const username = payload.slice(0, separator);
  const issuedAt = Number(payload.slice(separator + 1));
  const now = Date.now();

  if (!Number.isFinite(issuedAt) || issuedAt > now + 60_000) return false;
  if (now - issuedAt > SESSION_MAX_AGE_MS) return false;

  const expectedUsername = process.env.ADMIN_USERNAME || "admin";
  return safeEqual(username, expectedUsername);
}

export async function requireAdmin() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    redirect("/admin/login");
  }
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 0,
  });
}

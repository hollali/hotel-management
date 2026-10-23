"use server";

import { createAdminSession, destroyAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import crypto from "crypto";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function getCredentials() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (process.env.NODE_ENV === "production" && (!username || !password)) {
    throw new Error("Admin login is not configured");
  }

  return {
    username: username || "admin",
    password: password || "admin123",
  };
}

export async function adminLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (typeof username !== "string" || typeof password !== "string") {
    throw new Error("Invalid credentials");
  }

  const expected = getCredentials();
  const userMatches = safeEqual(username, expected.username);
  const passwordMatches = safeEqual(password, expected.password);

  if (!userMatches || !passwordMatches) {
    throw new Error("Invalid credentials");
  }

  await createAdminSession(username);
  redirect("/admin");
}

export async function adminLogout() {
  await destroyAdminSession();
  redirect("/admin/login");
}

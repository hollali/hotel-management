"use server";

import { createAdminSession, destroyAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export async function adminLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD || "admin123";

  if (username !== expectedUser || password !== expectedPass) {
    throw new Error("Invalid credentials");
  }

  await createAdminSession(username);
  redirect("/admin");
}

export async function adminLogout() {
  await destroyAdminSession();
  redirect("/admin/login");
}

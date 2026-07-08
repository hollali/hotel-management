import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAuthSession() {
  return auth();
}

export async function getCurrentUser() {
  return currentUser();
}

export async function getUserRole(): Promise<string | null> {
  const session = await auth();
  const metadata = (session.sessionClaims as Record<string, unknown>)?.metadata as
    | Record<string, unknown>
    | undefined;
  const roleFromClaims = metadata?.role as string | undefined;
  if (roleFromClaims) return roleFromClaims;

  if (session.userId) {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, session.userId))
        .limit(1);
      if (user) return user.role;
    } catch {
      // DB unavailable
    }
  }

  return null;
}

export async function requireRole(role: string) {
  const userRole = await getUserRole();
  if (userRole !== role) {
    throw new Error(`Unauthorized: ${role} access required`);
  }
  return true;
}

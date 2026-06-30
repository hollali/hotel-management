import { auth, currentUser } from "@clerk/nextjs/server";

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
  return (metadata?.role as string) ?? null;
}

export async function requireRole(role: string) {
  const userRole = await getUserRole();
  if (userRole !== role) {
    throw new Error(`Unauthorized: ${role} access required`);
  }
  return true;
}

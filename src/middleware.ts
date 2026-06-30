import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/auth(.*)",
  "/rooms(.*)",
  "/contacts(.*)",
  "/api/webhooks(.*)",
]);

const isAdminRoute = createRouteMatcher(["/studio(.*)", "/dashboard/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const session = await auth();
    const metadata = (session.sessionClaims as Record<string, unknown>)?.metadata as
      | Record<string, unknown>
      | undefined;
    const role = metadata?.role as string | undefined;
    if (role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }
  }

  if (!isPublicRoute(req) && !isAdminRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

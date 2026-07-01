import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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
    if (!session.userId) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
    const metadata = (session.sessionClaims as Record<string, unknown>)?.metadata as
      | Record<string, unknown>
      | undefined;
    const role = metadata?.role as string | undefined;
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
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

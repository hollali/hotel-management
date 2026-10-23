# Security Policy

## Supported Versions

| Version              | Supported |
| -------------------- | --------- |
| `main` (latest)      | Yes       |
| Older commits/tags   | No        |

## Reporting a Vulnerability

Please report vulnerabilities privately through GitHub Security Advisories:

https://github.com/hollali/hotel-management/security/advisories/new

Do not open a public issue for a suspected vulnerability. Include reproduction
steps, affected routes/files, and impact where possible. We aim to acknowledge
reports within 5 business days and will coordinate disclosure after a fix is
available.

## Deployment Security Requirements

The application fails closed in production when required admin settings are
missing:

- `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SECRET` **must** be set. The
  development fallbacks (`admin` / `admin123` / `default-secret-change-me`) are
  rejected in production, and login is disabled if the credentials are absent.
- Use a random `ADMIN_SECRET` of at least 32 bytes, for example
  `openssl rand -hex 32`. Rotating it invalidates all admin sessions.
- Set `NEXT_PUBLIC_URL` to the canonical HTTPS origin so Paystack callbacks and
  admin logout redirects cannot be pointed at an untrusted host.
- Keep `PAYSTACK_SECRET_KEY`, `CLERK_SECRET_KEY`, `SANITY_STUDIO_TOKEN`,
  `RESEND_API_KEY`, and `SENTRY_AUTH_TOKEN` server-side only.
- Configure the Paystack webhook at `/api/paystack/webhook` and the Clerk webhook
  at `/api/webhooks/clerk`. Do not expose these endpoints through a proxy that
  rewrites or strips signature headers.
- Contact-form delivery requires `RESEND_API_KEY`; without it the API returns
  `503` rather than pretending the message was sent.

## Implemented Controls

- Admin sessions are HMAC-SHA256 signed, expire after 8 hours, and are stored in
  an `HttpOnly`, `SameSite=Lax` cookie scoped to `/admin`. Cookie `Secure` is
  enabled in production. Signature, username, and credential comparisons are
  timing-safe.
- Guest bookings can only be cancelled by their owner. Account deletion guards
  against empty booking lists before deleting dependent payments.
- Paystack webhook signatures are verified with a timing-safe comparison, and
  successful transactions are re-checked for amount, currency, and booking
  linkage before confirmation.
- Booking creation re-computes pricing server-side, validates dates/guest counts
  against the room capacity, and checks confirmed, pending, checked-in, and
  admin-blocked availability.
- Reviews and role updates are validated server-side; review and contact-email
  content is HTML-escaped.
- Security headers are set in `next.config.js`:
  `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
  `Permissions-Policy`, and HSTS in production. `X-Powered-By` is disabled.
- The Sentry tunnel route (`/monitoring`) is public so browser error reporting is
  not blocked by Clerk middleware.
- The debug session endpoint was removed to avoid exposing session claims.

## Known Advisories and Follow-ups

Run `npm audit --omit=dev` before each deploy.

- A critical advisory remains in `decompress`, pulled in transitively by
  `sanity@3.99`. The fix requires a major Sanity upgrade (v6); schedule and test
  this separately because the Studio schema/config may need changes.
- A high-severity advisory remains in the PostCSS version nested under Next.js.
  The available fix is Next.js 16 (major). Direct PostCSS is already on `8.5.31`.
- `sanity` and `@sanity/vision` are runtime dependencies because the Studio is
  built from this repository. If the Studio is deployed separately, move them to
  `devDependencies` to reduce the production attack surface.
- No Content-Security-Policy is configured yet. Adding one requires allow-listing
  Clerk, Sanity, Paystack, and Sentry origins and should be tested in report-only
  mode first.
- Admin access is split between the cookie-based `/admin` portal and Clerk
  role-gated `/dashboard/admin` pages. Consolidating them is tracked as a
  follow-up; until then, provision both authentication paths deliberately.
- There is no automated test suite or CI workflow. The required pre-deploy gate
  is `npx tsc --noEmit && npm run lint && npm run build`.

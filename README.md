# Hotel Management System

A full-stack hotel management application built with Next.js 15, Clerk authentication, NeonDB (PostgreSQL) with Drizzle ORM, Sanity CMS for content management, and Paystack for payment processing.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat-square&logo=clerk)](https://clerk.com/)
[![NeonDB](https://img.shields.io/badge/NeonDB-PostgreSQL-00E599?style=flat-square&logo=postgresql)](https://neon.tech/)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat-square&logo=drizzle)](https://orm.drizzle.team/)
[![Sanity](https://img.shields.io/badge/Sanity.io-CMS-red?style=flat-square&logo=sanity)](https://www.sanity.io/)
[![Paystack](https://img.shields.io/badge/Paystack-Payments-00C3E3?style=flat-square&logo=paystack)](https://paystack.com/)

Date: 2026-10-23

## Features

- **Authentication & Authorization** — Clerk for guest accounts and the user dashboard, plus a separate HMAC-signed cookie session for the `/admin` management portal (8-hour expiry)
- **Hotel Room Listings** — Browse rooms with CMS-managed content (amenities, pricing, images)
- **Booking System** — Server actions with server-side pricing, date/guest validation, and room availability checks (confirmed, pending, and checked-in bookings plus admin-blocked dates)
- **Payment Processing** — Paystack integration in GHS with webhook signature verification and amount/currency checks
- **Admin Portals** — Cookie-authenticated management portal at `/admin`; Clerk role-gated admin pages under `/dashboard/admin`
- **Content Management** — Sanity Studio (standalone on port 3333) for hotel rooms, amenities, promotions, FAQs, policies, and gallery content
- **Transactional Database** — PostgreSQL via NeonDB with Drizzle ORM (users, bookings, guests, payments, invoices, check-in/out, activity logs)
- **Email Notifications** — Resend for booking confirmations, cancellations, and contact-form delivery
- **Observability** — Sentry with a `/monitoring` tunnel route
- **Security Hardening** — Security headers, ownership checks on bookings, timing-safe comparisons, and input validation

## Tech Stack

| Category        | Technology                         |
| --------------- | ---------------------------------- |
| Framework       | Next.js 15 (App Router)            |
| Language        | TypeScript 5                       |
| Styling         | Tailwind CSS 3 + Framer Motion     |
| Auth            | Clerk + signed admin session cookie |
| Database        | NeonDB (PostgreSQL)                |
| ORM             | Drizzle ORM + drizzle-kit          |
| CMS             | Sanity.io (standalone Studio)      |
| Payments        | Paystack (GHS)                     |
| Email           | Resend                             |
| Monitoring      | Sentry                             |
| Validation      | Server Actions + server-side checks |

## Getting Started

### Prerequisites

- Node.js 20+ (Node 22 tested)
- npm
- A NeonDB (PostgreSQL) database
- A Clerk application
- A Sanity.io project
- A Paystack account (for payment processing)

### 1. Clone & Install

```bash
git clone https://github.com/hollali/hotel-management.git
cd hotel-management
npm install
```

### 2. Environment Variables

Copy the following into `.env`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_SIGNING_SECRET=whsec_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# NeonDB (PostgreSQL)
DATABASE_URL="postgresql://user:pass@ep-xxx.aws.neon.tech/db?sslmode=require"

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TOKEN=your_token

# Paystack
PAYSTACK_SECRET_KEY=sk_live_...        # Secret key from Paystack dashboard
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_...  # Public key from Paystack dashboard

# Resend (booking + contact emails)
RESEND_API_KEY=re_...
CONTACT_EMAIL=bookings@yourdomain.com
NEXT_PUBLIC_CONTACT_EMAIL=bookings@yourdomain.com

# Sentry (optional)
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# Admin portal (cookie auth)
# REQUIRED in production. The app refuses default credentials/secrets in production.
ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_SECRET=            # random 32+ byte secret (e.g. openssl rand -hex 32)

# Next.js
NEXT_PUBLIC_URL=http://localhost:3000   # Used for Paystack callback and logout redirects
```

> `.env.example` contains local-development placeholders only. Never deploy the fallback
> `admin` / `admin123` credentials or the default admin secret.

### 3. Database Migrations

```bash
# Generate and apply Drizzle migrations
npm run db:generate
npm run db:migrate
```

### 4. Run the Application

```bash
# Start Next.js development server
npm run dev
# Frontend: http://localhost:3000

# Start Sanity Studio (separate terminal)
npm run sanity:dev
# CMS: http://localhost:3333
```

### 5. Set Up Clerk Webhook

Configure a webhook in the Clerk Dashboard pointing to `http://localhost:3000/api/webhooks/clerk` for the `user.created`, `user.updated`, and `user.deleted` events.

### 6. Set Up Paystack Webhook (Production)

In your Paystack dashboard, add a webhook pointing to `https://yourdomain.com/api/paystack/webhook` for the `charge.success` event. The endpoint verifies the `x-paystack-signature` header with a timing-safe comparison, then re-verifies the transaction amount and currency before confirming a booking.

### 7. Verify the Build

```bash
npx tsc --noEmit
npm run lint
npm run build
```

There is currently no automated test suite or CI workflow; the commands above are the required pre-deploy checks.

## Payment Flow

1. User selects dates and guests on a room detail page
2. Clicks **Book Now & Pay** to initiate a Paystack transaction
3. Booking is created with `pending_payment` status
4. User is redirected to Paystack's secure checkout page
5. After successful payment, user is redirected back to `/payment/callback`
6. Booking status is updated to `confirmed` and payment record is created
7. Paystack also sends a `charge.success` webhook as a backup verification

## Project Structure

```
hotel-management/
├── src/
│   ├── app/
│   │   ├── (cms)/studio/        # Studio landing page (Studio runs on :3333)
│   │   ├── (web)/               # Public-facing pages
│   │   │   ├── auth/            # Sign-in/Sign-up (Clerk)
│   │   │   ├── contacts/        # Contact page
│   │   │   ├── dashboard/       # Guest dashboard + role-gated admin pages
│   │   │   ├── payment/         # Paystack callback handler
│   │   │   └── rooms/           # Room listings & details
│   │   ├── admin/               # Cookie-authenticated management portal
│   │   ├── api/
│   │   │   ├── contact/         # Contact form submission (public)
│   │   │   ├── promotions/      # Promo validation (public)
│   │   │   ├── paystack/        # Paystack webhook
│   │   │   └── webhooks/clerk/  # Clerk user sync webhook
│   │   ├── components/          # Header, Footer, Toast, ThemeProvider
│   │   ├── libs/                # email, sanityFetch, ensureUser
│   │   ├── global-error.tsx
│   │   └── layout.tsx
│   ├── actions/                 # Server actions
│   │   ├── bookings.ts          # Payment, bookings, cancellation
│   │   ├── admin.ts             # Admin stats, roles, booking status
│   │   ├── admin-auth.ts        # Admin login/logout
│   │   ├── reviews.ts
│   │   └── ...
│   ├── db/                      # Drizzle schema & connection
│   │   ├── index.ts             # Lazy NeonDB connection
│   │   ├── migrations/          # SQL migrations
│   │   └── schema/              # Table definitions
│   ├── lib/
│   │   └── admin-auth.ts        # Signed admin session helpers
│   ├── middleware.ts            # Clerk + route protection
│   └── types/                   # TypeScript declarations
├── schemaTypes/                 # Sanity schema definitions
│   ├── hotelRoom.ts
│   ├── review.ts
│   ├── amenity.ts
│   ├── hotelInfo.ts
│   ├── blockContent.ts
│   └── ...
├── sanity.config.ts             # Sanity Studio config
├── sanity.cli.ts                # Sanity CLI config
├── drizzle.config.ts            # Drizzle Kit config
├── next.config.js               # Headers, images, Sentry tunnel
└── tsconfig.json
```

## Available Scripts

| Script            | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start Next.js dev server         |
| `npm run build`   | Build for production             |
| `npm run start`   | Start production server          |
| `npm run lint`    | Run ESLint                       |
| `npx tsc --noEmit`| Type-check the project           |
| `npm run sanity:dev` | Start standalone Sanity Studio |
| `npm run sanity:build` | Build Sanity Studio for production |
| `npm run db:generate` | Generate Drizzle migrations   |
| `npm run db:push` | Push schema to database          |
| `npm run db:migrate` | Apply migrations              |
| `npm run db:studio` | Open Drizzle Studio            |

## Notes

- Sanity Studio runs as a **standalone application** on port 3333; the `/studio` route is an informational landing page.
- The database connection uses a lazy `Proxy` pattern and an IPv4-pinned undici dispatcher. The `dev`/`build`/`start` scripts also set `NODE_OPTIONS=--dns-result-order=ipv4first` for IPv4-only networks.
- Clerk webhooks sync user data to the local PostgreSQL database for transactional queries.
- Payments are processed in **GHS (Ghanaian Cedi)** via Paystack. Transactions are denominated in pesewas (amount × 100).
- Guest booking cancellation is restricted to the booking owner; contact and promo-validation APIs are public by design.
- Admin sessions use an `HttpOnly`, `SameSite=Lax` cookie scoped to `/admin` and expire after 8 hours. In production, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SECRET` must be configured; otherwise admin login is disabled.
- Security headers are configured in `next.config.js`; HSTS is only emitted in production.
- See [SECURITY.md](SECURITY.md) for deployment requirements, implemented controls, and known advisories.

## License

MIT

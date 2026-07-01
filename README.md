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

Date: 2026-07-01

## Features

- **Authentication & Authorization** — Clerk-powered auth with role-based access (admin, receptionist, manager, guest)
- **Hotel Room Listings** — Browse rooms with CMS-managed content (amenities, pricing, images)
- **Booking System** — Server actions for creating/managing bookings with room availability checks
- **Payment Processing** — Paystack integration with GHS support for secure online payments
- **Admin Dashboard** — Role-gated admin panel with full CRUD operations
- **Content Management** — Sanity Studio as a standalone CMS for hotel content (rooms, amenities, promotions, FAQs, policies, gallery)
- **Transactional Database** — PostgreSQL via NeonDB with Drizzle ORM schema (users, bookings, guests, payments, invoices, check-in/check-out, activity logs)
- **Server Components** — Leverages Next.js App Router with Server Components and Server Actions

## Tech Stack

| Category        | Technology                         |
| --------------- | ---------------------------------- |
| Framework       | Next.js 15 (App Router)            |
| Language        | TypeScript 5                       |
| Styling         | Tailwind CSS 3 + Headless UI       |
| Auth            | Clerk (webhooks for user sync)     |
| Database        | NeonDB (PostgreSQL)                |
| ORM             | Drizzle ORM + drizzle-kit          |
| CMS             | Sanity.io (standalone Studio)      |
| Payments        | Paystack (GHS)                     |
| Form Handling   | React Hook Form                    |
| State           | Zustand                            |

## Getting Started

### Prerequisites

- Node.js 18+
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

# Next.js
NEXT_PUBLIC_URL=http://localhost:3000   # Used for Paystack callback URL
```

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

In your Paystack dashboard, add a webhook pointing to `https://yourdomain.com/api/paystack/webhook` for the `charge.success` event.

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
│   │   ├── (cms)/studio/        # Sanity Studio route
│   │   ├── (web)/               # Public-facing pages
│   │   │   ├── auth/            # Sign-in/Sign-up
│   │   │   ├── contacts/        # Contact page
│   │   │   ├── dashboard/       # User/admin dashboard
│   │   │   ├── payment/         # Paystack callback handler
│   │   │   └── rooms/           # Room listings & details
│   │   └── api/
│   │       ├── contact/         # Contact form submission
│   │       ├── paystack/        # Paystack webhook
│   │       └── webhooks/clerk/  # Clerk user sync webhook
│   ├── actions/                 # Server actions
│   │   ├── bookings.ts          # Payment & booking actions
│   │   ├── users.ts
│   │   └── admin.ts
│   ├── components/              # React components
│   ├── db/                      # Drizzle schema & connection
│   │   ├── index.ts             # Lazy NeonDB connection
│   │   └── schema/              # Table definitions
│   ├── libs/
│   │   ├── clerk.ts             # Clerk client
│   │   └── sanityFetch.ts       # Lazy Sanity client
│   ├── middleware.ts             # Clerk route protection
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
├── next.config.js
└── tsconfig.json
```

## Available Scripts

| Script            | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start Next.js dev server         |
| `npm run build`   | Build for production             |
| `npm run start`   | Start production server          |
| `npm run lint`    | Run ESLint                       |
| `npm run sanity:dev` | Start standalone Sanity Studio |
| `npm run sanity:build` | Build Sanity Studio for production |
| `npm run db:generate` | Generate Drizzle migrations   |
| `npm run db:push` | Push schema to database          |
| `npm run db:migrate` | Apply migrations              |
| `npm run db:studio` | Open Drizzle Studio            |

## Notes

- Sanity Studio runs as a **standalone application** on port 3333 (not embedded in Next.js) to avoid bundling issues with the `motion` animation library.
- The database connection uses a lazy `Proxy` pattern to avoid build-time failures when `DATABASE_URL` is unset.
- Clerk webhooks sync user data to the local PostgreSQL database for transactional queries.
- Payments are processed in **GHS (Ghanaian Cedi)** via Paystack. Transactions are denominated in pesewas (amount × 100).

## License

MIT

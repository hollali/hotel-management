# 🏨 Hotel Management System

A comprehensive full-stack web application for managing hotel operations with modern technologies and seamless payment processing.

[![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Sanity](https://img.shields.io/badge/Sanity.io-CMS-red?style=flat-square&logo=sanity)](https://www.sanity.io/)

## 🎯 Overview

This hotel management system streamlines operations with an intuitive interface, real-time data management, and integrated payment processing. Built with performance, scalability, and user experience in mind.

## ✨ Features

### 🏢 Core Management

- **Interactive Dashboard:** Real-time metrics, occupancy charts, revenue analytics, and operational summaries
- **Smart Reservation System:** Advanced booking management with conflict detection, waitlist management, and automated confirmations
- **Dynamic Room Management:** Real-time availability tracking, room categorization, pricing tiers, and maintenance scheduling
- **Customer Relationship Management:** Complete guest profiles, booking history, preferences, and loyalty program integration
- **Staff Management:** Role-based access control, shift scheduling, performance tracking, and permission management

### 💰 Financial Operations

- **Advanced Billing System:** Automated invoice generation, tax calculations, discount management, and payment tracking
- **Multi-Currency Support:** Dynamic currency conversion and regional pricing
- **Comprehensive Reporting:** Revenue analytics, occupancy reports, seasonal trends, and custom report generation
- **Payment Processing:** Dual payment gateway integration with Stripe and Paystack for global coverage

### 🌐 Additional Features

- **Multi-language Support:** Internationalization for global operations
- **Mobile Responsive:** Optimized for all devices and screen sizes
- **Real-time Notifications:** Instant updates for bookings, payments, and system alerts
- **Data Export:** CSV, PDF, and Excel export capabilities
- **Audit Trail:** Complete activity logging and change tracking

## 🛠️ Technology Stack

### Frontend

| Technology          | Version | Purpose                                 |
| ------------------- | ------- | --------------------------------------- |
| **Next.js**         | 13+     | Full-stack React framework with SSR/SSG |
| **React**           | 18+     | Component-based UI library              |
| **TypeScript**      | 5+      | Type-safe JavaScript development        |
| **Tailwind CSS**    | 3+      | Utility-first CSS framework             |
| **Headless UI**     | Latest  | Accessible component primitives         |
| **React Hook Form** | Latest  | Form state management                   |
| **Zustand**         | Latest  | Lightweight state management            |

### Backend & Database

| Technology     | Purpose                             |
| -------------- | ----------------------------------- |
| **Node.js**    | JavaScript runtime environment      |
| **Express.js** | Web application framework           |
| **MongoDB**    | Primary NoSQL database              |
| **Mongoose**   | MongoDB object modeling             |
| **GraphQL**    | API query language                  |
| **Sanity.io**  | Headless CMS for content management |

### Payment Processing

| Provider     | Region                    | Features                                     |
| ------------ | ------------------------- | -------------------------------------------- |
| **Stripe**   | Global (Primary)          | Credit cards, digital wallets, subscriptions |
| **Paystack** | Africa & Emerging Markets | Mobile money, bank transfers, cards          |

### Development & Deployment

- **ESLint & Prettier:** Code formatting and linting
- **Husky:** Git hooks for code quality
- **Jest & React Testing Library:** Unit and integration testing
- **Docker:** Containerization for consistent deployments
- **Vercel/Netlify:** Preferred hosting platforms

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB instance (local or Atlas)
- Git for version control

### 1. Repository Setup

```bash
# Clone the repository
git clone https://github.com/hollali/hotel-management.git

# Navigate to project directory
cd hotel-management

# Install dependencies
npm install
# or
yarn install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/hotel-management
# or MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel-management

# Sanity.io Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Stripe Payment Gateway
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Paystack Payment Gateway
PAYSTACK_PUBLIC_KEY=pk_test_your_public_key
PAYSTACK_SECRET_KEY=sk_test_your_secret_key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# File Upload
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Database Setup

```bash
# Start MongoDB (if running locally)
mongod

# Run database migrations (if applicable)
npm run migrate

# Seed initial data
npm run seed
```

### 4. Sanity.io Setup

```bash
# Navigate to sanity studio
cd sanity-studio

# Install Sanity CLI globally
npm install -g @sanity/cli

# Create new Sanity project
sanity init

# Deploy the studio
sanity deploy

# Start the studio locally
sanity start
```

### 5. Payment Gateway Setup

#### Stripe Configuration

1. Create a [Stripe account](https://stripe.com/)
2. Navigate to Developers → API keys
3. Copy your publishable and secret keys
4. Set up webhooks for payment events
5. Add webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`

#### Paystack Configuration

1. Create a [Paystack account](https://paystack.com/)
2. Navigate to Settings → API Keys & Webhooks
3. Copy your public and secret keys
4. Configure webhook URL: `https://yourdomain.com/api/webhooks/paystack`
5. Enable relevant webhook events

### 6. Development Server

```bash
# Start the development server
npm run dev
# or
yarn dev

# Access the application
# Frontend: http://localhost:3000
# Sanity Studio: http://localhost:3333
```

## 📁 Project Structure

```
hotel-management/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   ├── forms/           # Form components
│   ├── layout/          # Layout components
│   └── dashboard/       # Dashboard-specific components
├── pages/               # Next.js pages and API routes
│   ├── api/             # API endpoints
│   ├── dashboard/       # Dashboard pages
│   └── auth/            # Authentication pages
├── lib/                 # Utility functions and configurations
│   ├── auth/            # Authentication logic
│   ├── database/        # Database connections and models
│   └── payments/        # Payment processing logic
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── styles/              # Global styles and Tailwind config
├── sanity-studio/       # Sanity CMS configuration
├── public/              # Static assets
├── tests/               # Test files
└── docs/                # Documentation files
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🚢 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Deployment Options

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

#### Docker Deployment

```bash
# Build Docker image
docker build -t hotel-management .

# Run container
docker run -p 3000:3000 hotel-management
```

#### Traditional Hosting

```bash
# Build static files
npm run build
npm run export

# Upload dist/ folder to your hosting provider
```

## 📊 API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Reservation Endpoints

- `GET /api/reservations` - List all reservations
- `POST /api/reservations` - Create new reservation
- `PUT /api/reservations/:id` - Update reservation
- `DELETE /api/reservations/:id` - Cancel reservation

### Payment Endpoints

- `POST /api/payments/stripe/create-intent` - Create Stripe payment intent
- `POST /api/payments/paystack/initialize` - Initialize Paystack payment
- `POST /api/webhooks/stripe` - Stripe webhook handler
- `POST /api/webhooks/paystack` - Paystack webhook handler

## 🔧 Configuration

### Payment Gateway Selection

The system automatically selects the appropriate payment gateway based on:

- User's location/currency
- Preferred payment methods
- Regional availability

### Customization Options

- Theme customization via Tailwind CSS
- Email templates in `/templates/emails/`
- Notification settings in `/lib/notifications/`
- Report templates in `/lib/reports/`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation
- Follow the existing code style
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js team](https://nextjs.org/) for the amazing framework
- [Sanity.io](https://www.sanity.io/) for the flexible CMS
- [Stripe](https://stripe.com/) and [Paystack](https://paystack.com/) for payment processing
- All contributors who have helped improve this project

## 📞 Support

- **Documentation:** [Project Wiki](https://github.com/hollali/hotel-management/wiki)
- **Issues:** [GitHub Issues](https://github.com/hollali/hotel-management/issues)
- **Discussions:** [GitHub Discussions](https://github.com/hollali/hotel-management/discussions)
- **Email:** support@hotelmanagement.com

---

**Made with ❤️ for the hospitality industry**

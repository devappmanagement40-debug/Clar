# Equinor - Digital Services Platform

## Overview

Equinor is the product name used by this application. The platform provides user accounts, product information, deposits, withdrawals, rewards, and referral features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React Context for auth state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming (dark mode default)
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **Session Management**: express-session with MemoryStore (development) or connect-pg-simple (production)
- **Authentication**: Session-based auth with bcrypt password hashing
- **API Design**: RESTful JSON API under `/api` prefix

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Migrations**: Drizzle Kit with `db:push` command
- **Key Tables**: users, products, userProducts, deposits, withdrawals, withdrawalWallets, paymentChannels, tasks, userTasks, transactions, platformSettings

### Authentication & Authorization
- **User Auth**: Phone number + country + password combination
- **Session Storage**: Server-side sessions with httpOnly cookies
- **Role System**: Regular users, Admins, Super Admins
- **Middleware**: `requireAuth` and `requireAdmin` middleware for route protection

### Key Features
- **Country Support**: Congo-Kinshasa only, using CDF and phone prefix +243
- **Product System**: Virtual industrial robot products with daily earnings cycles
- **Referral System**: 3-level commission structure for team building
- **Task System**: Invite-based tasks with bonus rewards
- **Admin Panel**: Full CRUD for users, deposits, withdrawals, products, payment channels, and settings

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/      # UI components including admin panel
│   ├── pages/           # Route pages (home, invest, tasks, team, account, admin)
│   ├── lib/             # Utilities (auth, queryClient, countries)
│   └── hooks/           # Custom React hooks
├── server/              # Express backend
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Database operations interface
│   ├── db.ts            # Database connection
│   └── seed.ts          # Initial data seeding
├── shared/              # Shared code between client/server
│   └── schema.ts        # Drizzle schema and Zod validators
└── migrations/          # Database migrations
```

## External Dependencies

### Database
- **PostgreSQL**: Supabase is the application's only database, configured with `SUPABASE_NEW_DATABASE_URL`.
- **Drizzle ORM**: Type-safe database queries and schema management
- The previous database is retained but is not read or written by the application.

### Frontend Libraries
- **Radix UI**: Accessible UI primitives (dialogs, dropdowns, tabs, etc.)
- **TanStack Query**: Server state management and caching
- **Lucide React**: Icon library

### Backend Libraries
- **bcrypt**: Password hashing
- **express-session**: Session management
- **memorystore**: In-memory session store for development

### Build & Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Backend bundling for production
- **TypeScript**: Type checking across full stack

### Environment Variables Required
- `SUPABASE_NEW_DATABASE_URL`: Supabase PostgreSQL connection string used for application data, sessions, and schema changes
- `SESSION_SECRET`: Secret for session encryption (required)

## Running on Replit

### Prerequisites
- The visual preview does not require database secrets. For the database-backed application, configure `SUPABASE_NEW_DATABASE_URL` and `SESSION_SECRET` as Replit Secrets.

### First-time setup
```bash
npm install          # install dependencies
npm run dev          # start on port 5000
```

`npm run dev` starts a clearly labeled, database-free visual preview when neither `SUPABASE_NEW_DATABASE_URL` nor `SUPABASE_DATABASE_URL` is configured. To start only that preview explicitly, run `npm run dev:preview`. The preview does not provide live accounts, stored data, or financial actions.

The database-backed server starts when one of those database URLs is configured. Do not run `npm run db:push` as part of a visual-preview setup; review the external database and schema changes before applying it.

The Supabase schema is managed from `shared/schema.ts` with Drizzle. On first start, the app seeds countries, tasks, payment channels, and platform settings when empty. The app performs one transactional, create-only bootstrap for the eight initial Equinor product offers; a migration marker prevents later starts from recreating deleted offers or overwriting admin edits. Staking products remain managed from the admin panel.

### Initial administrator
The initial administrator is created only when `ADMIN_PASSWORD` is configured as a secret. Existing administrator records keep their own login password; startup only ensures the configured admin role and PIN.

### Workflow
The "Start application" workflow runs `npm run dev` and serves the app on port 5000 (mapped to external port 80).

---

## Recent Changes (February 2026)
- Deposit system now uses dual approach: Soleaspay (automatic) per-country OR manual recharge channels
- Admin can enable Soleaspay globally and select specific countries for automatic payment
- Users from Soleaspay-enabled countries get automatic mobile money flow (no channel selection)
- Users from non-Soleaspay countries see manual recharge channels managed by admin
- Platform setting `soleaspayEnabled` controls global Soleaspay on/off
- Platform setting `soleaspayCountries` stores comma-separated country codes (e.g. "TG,BF,CI")
- Backend enforces Soleaspay for enabled countries (cannot bypass to manual)
- InPay Africa supports direct hosted deposits for enabled countries, signed webhooks, admin-triggered payouts, and balance checks

## Recent Changes (January 2026)
- Completed full frontend implementation with all pages and modals
- Implemented complete backend with all API routes
- Added database seeding for products, tasks, payment channels, and settings
- Removed emoji usage in favor of text country codes

## Business Rules
- **Signup Bonus**: 1000 CDF
- **Free Daily Product**: 50 CDF per day
- **Withdrawal Fees**: 16%
- **Minimum Deposit**: 3000 CDF
- **Minimum Withdrawal**: 1200 CDF
- **Withdrawal Hours**: 8h-17h
- **Max Withdrawals/Day**: 3
- **Referral Commissions**: Level 1 (28%), Level 2 (1%), Level 3 (1%)
- **CATL VIP Product Cycle**: 150 days; total return is daily earnings × 150, for new purchases only

## Supported Country
- Congo-Kinshasa (CD) - CDF - +243
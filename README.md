# GhaniaSkin — Premium Skincare E-Commerce

A full-stack skincare e-commerce platform built with Next.js 16, Prisma 7, and Midtrans payment gateway.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: SQLite via Prisma 7 + libsql adapter
- **Auth**: NextAuth v5 (JWT + credentials)
- **Styling**: Tailwind CSS v4
- **Fonts**: Playfair Display (serif) + DM Sans (sans-serif)
- **Cart**: Zustand (persisted)
- **Payment**: Midtrans Snap

## Features

- Home page with hero, categories, featured products
- Product listing with filter & sort + stock indicator
- Shopping cart (persistent) + Checkout with Midtrans
- Sign in / Sign up with protected routes
- Admin Panel: dashboard, product CRUD, category CRUD, order management, users

## Getting Started

```bash
git clone https://github.com/fadhelgame/GhaniaE.git
cd GhaniaE
npm install

# Setup environment
cp .env.example .env
# Fill in .env values

# Database
npx prisma migrate dev
npx prisma generate
npx tsx prisma/seed.ts

# Run
npm run dev
```

## Admin Access (after seed)

```
URL:      http://localhost:3000/admin
Email:    admin@ghaniaskin.com
Password: admin123
```

## Midtrans Setup

Get sandbox keys from [Midtrans Dashboard](https://dashboard.midtrans.com) and add to `.env`.

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run db:migrate   # Run Prisma migrations
npm run db:generate  # Generate Prisma client
npm run db:seed      # Seed database
```

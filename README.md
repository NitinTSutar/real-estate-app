# React JS Machine Test - Real Estate Web Platform (MVP)

## Project Overview

This project is a frontend-only React JS MVP for a real estate listing platform.
It includes search and filtering, property listing/detail flows, mocked role-based authentication, and role dashboards for Buyer, Seller, and Admin.
All data and workflows are mocked in the client using local state/context.

## Tech Stack

- React JS (Functional Components)
- React Router
- Context API (Auth, Property, Toast contexts)
- Tailwind CSS (utility-first styling)
- Mock data/state (no backend APIs)
- Vite (build and dev tooling)

## Features Implemented (mapped to test requirements)

- Search & Navigation
  - Location search by city/locality/state/project name on Home page
  - Filters for configuration, budget range, and possession period
  - Grid and Map View toggle (map is a mock placeholder with clickable pins)

- Property Listings
  - Property cards show name, price, location, configuration, and "View Details"
  - Property Details page (`/property/:id`) includes:
    - Price
    - Full location
    - Amenities
    - Possession
    - Sample flat video (embedded when available)
    - Building/locality video placeholder

- User Profiles
  - Buyer can browse without login
  - Buyer login enables:
    - Save favorite properties
    - Schedule video call/site visit
    - Send inquiry to seller
  - Buyer Dashboard:
    - Saved properties
    - Scheduled appointments
  - Seller Dashboard:
    - Mock seller registration fee checkbox
    - Add new property form
    - Upload/attach video URL or file name (mocked)
    - View buyer inquiries
    - View scheduled appointments
  - Admin Panel:
    - View all property listings
    - Approve/reject property listings
    - View buyers and sellers
    - View and approve scheduled appointments

- Communication Tools (Mocked)
  - Phone call via clickable `tel:` action
  - Video call/site visit scheduling with date and time inputs
  - Confirmation feedback via toast notifications

- Authentication & Protected Routes
  - Mock Google login flow with role selection (Buyer/Seller/Admin dropdown)
  - Protected routes:
    - Buyer Dashboard
    - Seller Dashboard
    - Admin Panel

- Notifications (Mock)
  - Toast notifications on scheduling and approval actions

- Monetization (UI Level)
  - Seller registration fee (mock checkbox)
  - Premium listing toggle while adding property
  - Premium badge on property cards

## Routes (/, /property/:id, /dashboard, /seller-dashboard, /admin)

- `/` - Home page with search, filters, property cards, and list/map toggle
- `/property/:id` - Property details page
- `/dashboard` - Buyer dashboard (protected, buyer role)
- `/seller-dashboard` - Seller dashboard (protected, seller role)
- `/admin` - Admin panel (protected, admin role)

## Mock Login Instructions (buyer/seller/admin dropdown)

1. Open the app.
2. In Navbar, choose a role from the dropdown: `Buyer`, `Seller`, or `Admin`.
3. Click `Sign in with Google (Mock)`.
4. Use role-specific menu links:
   - Buyer -> Dashboard
   - Seller -> Seller Dashboard
   - Admin -> Admin Panel
5. Click `Logout` to switch roles quickly.

## How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview production build:
   ```bash
   npm run preview
   ```

## Assumptions & Limitations

- This is an MVP with mocked frontend flows only (no backend/database integration).
- Authentication is mocked (no real OAuth exchange).
- Property, appointment, and inquiry actions are handled in client-side state.
- Map view is a placeholder UI, not an actual maps integration.
- Media uploads are UI-level mock behavior only.
- Notifications are toast-based and frontend-only.

## Security Assumption

This MVP assumes deployment in an HTTPS-enabled environment. SSL/TLS is treated as an infrastructure responsibility and is not configured in this frontend-only project.

# Aakash Aqua Tech

Modern Full-Stack Web Application for **Aakash Aqua Tech** - Industrial & Commercial Water Treatment Engineering.
Engineered using the **Mana Stack**: React + Vite + TailwindCSS on the frontend with a modular PHP REST API backend.

## Tech Stack Overview

- **Frontend**:
  - React 18
  - Vite 6
  - TailwindCSS v4 with `@tailwindcss/vite`
  - Lucide Icons
  - Mobile-responsive, high-conversion UI
- **Backend**:
  - PHP REST API (Modular architecture: config, database, models, helpers, api endpoints)
  - CORS-enabled with proxy routing
  - MySQL with automatic SQLite dev fallback

## Getting Started

### 1. Frontend Development

Install dependencies and start the Vite dev server:

```bash
# Navigate to the project root
npm install

# Start the frontend dev server
npm run dev
```

The application will be live at `http://localhost:5173`.

### 2. Backend API Server

Run the local PHP server using XAMPP or PHP CLI:

```bash
# Using the predefined npm script (points to default XAMPP PHP)
npm run backend

# Or directly run PHP CLI on port 8000
php -S localhost:8000
```

Vite is preconfigured via `vite.config.ts` to automatically proxy all `/backend` requests to `http://localhost:8000/backend`.

## Project Structure

```
aakashaquatech/
├── backend/
│   ├── api/
│   │   ├── contact.php       # Handles inquiries & quote requests
│   │   ├── products.php      # Products list & details
│   │   ├── services.php      # Water treatment engineering services
│   │   └── settings.php      # Company metadata & contact info
│   ├── config/
│   │   ├── app.php           # App configuration
│   │   ├── cors.php          # Cross-Origin Resource Sharing
│   │   └── database.php      # Database connection handler
│   ├── database/
│   │   └── schema.sql        # Database tables & seed data
│   ├── helpers/
│   │   └── response.php      # Standard JSON response formatters
│   ├── models/
│   │   ├── Inquiry.php       # Inquiry/lead capture model
│   │   └── Product.php       # Product data model
│   ├── .htaccess             # Apache rewrite & CORS rules
│   └── bootstrap.php         # Application loader & error handlers
├── public/                   # Static assets & icons
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── WhyUs.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── Footer.tsx
│   │   ├── services/
│   │   │   └── api.ts        # API client for backend communication
│   │   └── App.tsx           # Main page layout & state
│   ├── styles/
│   │   ├── index.css
│   │   └── tailwind.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Production Build

```bash
npm run build
```

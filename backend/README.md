# Aakash Aqua Tech - Backend API

Modular PHP REST API designed following the Highbizz architecture.

## Starting the Server

Run from the root or inside the `backend` folder:

```bash
# From workspace root
npm run backend

# Or via PHP CLI directly
cd backend
php -S localhost:8000
```

## Available Endpoints

- `GET /backend/api/settings.php` - Company metadata, contact numbers, address, and live stats.
- `GET /backend/api/products.php` - Returns RO systems, softeners, DM plants, and accessories. Optional query parameter `?category=industrial-ro`.
- `GET /backend/api/services.php` - Turnkey water services, testing, AMC, and STP engineering.
- `POST /backend/api/contact.php` - Captures quotation requests and customer inquiries.

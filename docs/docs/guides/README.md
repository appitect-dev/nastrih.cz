# Nastrih.cz Documentation

Welcome to the documentation for Nastrih.cz, a modern barbershop booking system. This documentation provides comprehensive information about the project's architecture, components, and features.

## Project Overview

Nastrih.cz is a booking system for barbershops, built with:

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Next-Auth for authentication
- Custom theming system

The system provides:
- Online booking interface (`/rezervace`)
- Admin dashboard (`/admin`)
- Customizable booking theme
- User authentication

## Core Features

### Booking System (`/rezervace`)
- Step-by-step booking process
- Service selection
- Appointment scheduling
- Customer information collection
- Theme customization support

### Admin Panel (`/admin`)
- Protected admin interface
- Booking management
- Service configuration
- System settings

### Theme System
- Customizable color schemes
- Live theme preview
- Theme persistence
- Component-level theming

## Project Structure

```
nastrih.cz/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── rezervace/      # Booking system routes
│   │   └── admin/          # Admin panel routes
│   ├── components/         # React components
│   ├── contexts/          # React contexts (including theme)
│   └── lib/               # Utility functions
```

## Quick Links

- [Getting Started](./getting-started.md)
- [Theme System](./theme-system.md)
- [Booking Flow](./booking-flow.md)
- [Admin Panel](./admin-panel.md) 
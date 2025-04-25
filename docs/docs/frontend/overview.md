# Frontend Overview

The Nastrih.cz frontend is built using Next.js 14 with the App Router, providing a modern and performant user interface for the barbershop booking system.

## Technology Stack

- **Next.js 14**: React framework with App Router for routing and server components
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Theme System**: Custom theme implementation for dynamic styling

## Project Structure

```
front/
├── src/
│   ├── app/
│   │   ├── rezervace/           # Booking system routes
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── termin/
│   │   │   └── shrnuti/
│   │   └── admin/              # Admin panel routes
│   ├── components/             # Reusable React components
│   │   ├── ServiceSelector.tsx
│   │   ├── ThemeCustomizer.tsx
│   │   └── UserInfoForm.tsx
│   ├── contexts/              # React contexts
│   │   └── ThemeContext.tsx
│   └── styles/               # Global styles
│       └── globals.css
├── package.json
└── tailwind.config.js
```

## Key Features

### Booking Flow (`/rezervace`)

The booking system follows a step-by-step process:
1. Service Selection
2. Date and Time Selection
3. Customer Information
4. Confirmation

### Theme System

The application includes a dynamic theme system that allows customization of:
- Colors (primary, background, text)
- Border radius
- Font sizes
- Spacing

Example theme configuration:
```typescript
interface Theme {
  colors: {
    primary: string;
    background: string;
    text: string;
  };
  borderRadius: string;
  fontSize: {
    small: string;
    medium: string;
    large: string;
  };
}
```

### Components

Key reusable components include:
- `ServiceSelector`: Service selection interface
- `ThemeCustomizer`: Theme customization panel
- `UserInfoForm`: Customer information form

## Development

To run the frontend locally:

```bash
cd front
npm install
npm run dev
```

The development server will start at `http://localhost:3000`. 
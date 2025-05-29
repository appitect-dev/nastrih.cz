# Frontend Architecture

## Architecture Diagram

```mermaid
graph TD
    subgraph "Frontend (Next.js 14)"
        A[Landing Page] --> B[Booking Flow]
        A --> C[Admin Panel]
        
        subgraph "Booking Flow"
            B --> B1[Service Selection]
            B --> B2[Date/Time Selection]
            B --> B3[Customer Info]
            B --> B4[Confirmation]
        end
        
        subgraph "Admin Panel"
            C --> C1[Dashboard]
            C --> C2[Bookings Management]
            C --> C3[Services Management]
            C --> C4[Staff Management]
            C --> C5[Opening Hours]
            C --> C6[Settings]
        end
        
        subgraph "Core Components"
            D[ThemeProvider] --> D1[BookingThemeContext]
            D --> D2[ThemeCustomizer]
            D --> D3[ServiceSelector]
            D --> D4[UserInfoForm]
            D --> D5[AdminNav]
        end
        
        subgraph "State Management"
            E[React Context] --> E1[Theme State]
            E --> E2[Booking State]
            E --> E3[Admin State]
        end
        
        subgraph "API Integration"
            F[API Routes] --> F1[Booking Endpoints]
            F --> F2[Admin Endpoints]
            F --> F3[Auth Endpoints]
        end
    end
```

## Implementation Guide

### 1. Project Structure
```
front/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── rezervace/      # Booking flow
│   │   ├── admin/         # Admin panel
│   │   └── setup/         # Initial setup
│   ├── components/         # Reusable components
│   │   ├── booking/       # Booking components
│   │   ├── admin/        # Admin components
│   │   └── shared/       # Shared components
│   ├── contexts/          # React contexts
│   ├── lib/              # Utility functions
│   └── styles/           # Global styles
```

### 2. Key Components
- `BookingThemeProvider`: Theme management
- `ServiceSelector`: Service selection interface
- `UserInfoForm`: Customer information collection
- `AdminNav`: Admin panel navigation
- `OpeningHoursManager`: Business hours management

### 3. State Management
- React Context for theme and booking state
- Session storage for booking flow
- API integration with backend services

### 4. Technology Stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React Context for state management
- Next-Auth for authentication
- Framer Motion for animations

### 5. Key Features
- Multi-step booking flow
- Real-time availability checking
- Theme customization
- Responsive design
- Admin dashboard
- Service management
- Staff management
- Business hours configuration 
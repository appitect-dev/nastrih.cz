# Components Documentation

This document provides detailed information about the reusable components in the Nastrih.cz project.

## Booking Components

### ServiceSelector

Located in: `src/components/ServiceSelector.tsx`

A component that displays available barbershop services and allows users to select one for booking.

#### Features:
- Displays service name, price, duration, and description
- Responsive grid layout
- Theme-aware styling
- Stores selection in session storage
- Visual feedback for selected service

#### Props:
None - Component is self-contained with internal state management

#### Usage Example:
```tsx
import ServiceSelector from '@/components/ServiceSelector';

export default function BookingPage() {
  return <ServiceSelector />;
}
```

### UserInfoForm

Located in: `src/components/UserInfoForm.tsx`

A form component for collecting customer information during the booking process.

#### Features:
- Collects name, email, phone, and optional notes
- Form validation
- Theme-aware styling
- Responsive design
- SMS confirmation notice

#### Props:
```typescript
interface UserInfoFormProps {
  onSubmit: (data: { 
    name: string; 
    email: string; 
    phone: string;
    note?: string;
  }) => void;
}
```

#### Usage Example:
```tsx
import UserInfoForm from '@/components/UserInfoForm';

export default function CheckoutPage() {
  const handleSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  return <UserInfoForm onSubmit={handleSubmit} />;
}
```

## Marketing Components

### Section

A container component that provides consistent padding and max-width for page sections.

#### Props:
```typescript
interface SectionProps {
  children: React.ReactNode;
  className?: string;
}
```

### SectionHeading

A component for section titles with optional subtitles.

#### Props:
```typescript
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}
```

### FeatureCard

A card component for displaying service features with icons.

#### Props:
```typescript
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}
```

### Testimonial

A component for displaying customer reviews.

#### Props:
```typescript
interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  rating: number;
}
```

### CallToAction

A component for conversion-focused sections.

#### Props:
```typescript
interface CallToActionProps {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}
```

## Admin Components

### AdminNav

Navigation component for the admin dashboard.

#### Features:
- Responsive navigation
- Active link highlighting
- Icon support
- Theme integration

#### Props:
None - Component uses internal routing logic

## Theme Components

### ThemeCustomizer

A component that allows admins to customize the booking system's appearance.

#### Features:
- Color picker for primary colors
- Font selection
- Border radius adjustment
- Live preview
- Theme persistence

#### Props:
None - Component uses the BookingThemeContext

## Best Practices

When using these components:

1. Always wrap theme-aware components within the `BookingThemeProvider`
2. Use TypeScript props interfaces for type safety
3. Maintain consistent spacing using the theme system
4. Follow the established naming conventions
5. Keep components focused and single-responsibility
6. Use proper error boundaries where appropriate 
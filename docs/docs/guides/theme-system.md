# Theme System Documentation

The Nastrih.cz booking system includes a powerful theming system that allows for complete customization of the booking interface. This document explains how the theme system works and how to use it.

## Overview

The theme system is built around a React Context (`BookingThemeContext`) that provides theme values to all components. It supports:

- Dynamic color schemes
- Font customization
- Spacing system
- Component-specific styles
- Real-time theme preview
- Theme persistence

## Theme Structure

The theme object has the following structure:

```typescript
interface Theme {
  // Colors
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  
  // Typography
  fontFamily: string;
  fontSize: {
    small: string;
    base: string;
    large: string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    bold: number;
  };

  // Spacing
  spacing: {
    small: string;
    base: string;
    large: string;
  };

  // Component Styles
  inputStyle: {
    backgroundColor: string;
    borderColor: string;
    padding: string;
  };
  buttonStyle: {
    padding: string;
    hoverEffect: "brightness" | "opacity";
  };

  // Border Radius
  borderRadius: string;
}
```

## Using the Theme

### Provider Setup

Wrap your application or booking section with the `BookingThemeProvider`:

```tsx
import { BookingThemeProvider } from '@/contexts/BookingThemeContext';

export default function BookingLayout({ children }) {
  return (
    <BookingThemeProvider>
      {children}
    </BookingThemeProvider>
  );
}
```

### Consuming Theme Values

Use the `useBookingTheme` hook in your components:

```tsx
import { useBookingTheme } from '@/contexts/BookingThemeContext';

export function MyComponent() {
  const { theme } = useBookingTheme();

  return (
    <div style={{
      backgroundColor: theme.backgroundColor,
      color: theme.textColor,
      padding: theme.spacing.base,
      borderRadius: theme.borderRadius,
      fontFamily: theme.fontFamily
    }}>
      Content
    </div>
  );
}
```

## Theme Customization

### Using ThemeCustomizer

The `ThemeCustomizer` component provides a UI for customizing theme values:

```tsx
import ThemeCustomizer from '@/components/ThemeCustomizer';

export function AdminPage() {
  return (
    <div>
      <h1>Theme Settings</h1>
      <ThemeCustomizer />
    </div>
  );
}
```

### Programmatic Theme Updates

You can update the theme programmatically using the `setTheme` function:

```tsx
const { theme, setTheme } = useBookingTheme();

const updatePrimaryColor = (color: string) => {
  setTheme({
    ...theme,
    primaryColor: color
  });
};
```

## Default Theme

The system includes a default theme that serves as a starting point:

```typescript
const defaultTheme: Theme = {
  primaryColor: '#D97706',
  backgroundColor: '#FFFFFF',
  textColor: '#111827',
  
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: {
    small: '0.875rem',
    base: '1rem',
    large: '1.125rem'
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 700
  },

  spacing: {
    small: '0.5rem',
    base: '1rem',
    large: '1.5rem'
  },

  inputStyle: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    padding: '0.75rem'
  },

  buttonStyle: {
    padding: '0.75rem 1.5rem',
    hoverEffect: 'brightness'
  },

  borderRadius: '0.5rem'
};
```

## Theme Persistence

Themes are automatically persisted to local storage and can be synchronized with a backend for consistent theming across devices.

### Storage Keys

- `booking-theme`: Stores the current theme configuration
- `theme-history`: Stores previous theme configurations for undo/redo functionality

## Best Practices

1. **Consistency**: Always use theme values instead of hardcoded styles
2. **Responsive Design**: Use theme values in combination with responsive utilities
3. **Performance**: Avoid unnecessary theme updates that could trigger re-renders
4. **Accessibility**: Ensure color combinations meet WCAG contrast requirements
5. **Fallbacks**: Provide fallback values for critical theme properties

## Common Issues and Solutions

### Theme Not Applying

Make sure components are wrapped in `BookingThemeProvider` and using the `useBookingTheme` hook correctly.

### Theme Reset on Refresh

Check that theme persistence is working and local storage is available.

### Inconsistent Styling

Verify that all style properties are being pulled from the theme object rather than using hardcoded values.

## Theme Migration

When updating theme structure:

1. Create a migration function
2. Update stored theme in local storage
3. Update all component implementations
4. Test across all breakpoints 
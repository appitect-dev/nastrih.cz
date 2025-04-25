# Booking Flow Documentation

This document describes the booking flow in the Nastrih.cz barbershop booking system.

## Overview

The booking process is designed to be intuitive and user-friendly, guiding customers through three main steps:

1. Service Selection (`/rezervace/sluzby`)
2. Appointment Time (`/rezervace/termin`)
3. Summary & Confirmation (`/rezervace/shrnuti`)

## Flow Steps

### 1. Service Selection (`/rezervace/sluzby`)

The first step where customers choose their desired service.

#### Features:
- Visual service cards
- Service descriptions and pricing
- Duration information
- Theme-aware styling

### 2. Appointment Time (`/rezervace/termin`)

Allows customers to choose their preferred appointment time.

#### Features:
- Calendar view for date selection
- Available time slots
- Theme-aware styling
- Session storage for selections

### 3. Summary & Confirmation (`/rezervace/shrnuti`)

Final step for reviewing and confirming the booking.

#### Features:
- Booking summary
- Customer information form
- Theme-aware styling
- Confirmation handling

## Theme Integration

The booking flow uses the theme system for consistent styling. The theme is applied through the `BookingThemeProvider` in the layout:

```typescript
// Example from /rezervace/layout.tsx
<BookingThemeProvider>
  <div style={{
    backgroundColor: theme.backgroundColor,
    borderRadius: theme.borderRadius
  }}>
    {children}
  </div>
</BookingThemeProvider>
```

## State Management

### Session Storage
Used for temporary data storage during the booking process:
- Selected service
- Chosen date/time
- Form data (before submission)

## Navigation

### URL Structure:
```
/rezervace/sluzby      # Service selection
/rezervace/termin      # Appointment time
/rezervace/shrnuti     # Summary & confirmation
```

### Progress Tracking:
- Visual progress indicator
- Step validation
- Back/forward navigation
- State preservation

## Theme Customization

Admins can customize the booking interface appearance:
- Access theme customizer
- Modify colors and styles
- Preview changes in real-time
- Save theme settings

## Best Practices

1. **Data Persistence**
   - Save progress in session storage
   - Handle browser refresh gracefully
   - Clear sensitive data after completion

2. **User Experience**
   - Clear progress indication
   - Helpful error messages
   - Mobile-friendly design
   - Fast loading states

3. **Validation**
   - Client-side validation
   - Form field validation
   - Availability checks

## Testing

### Key Test Cases:
1. Complete booking flow
2. Theme customization
3. Form validation
4. Session storage
5. Mobile responsiveness

## Monitoring

### Key Metrics:
- Completion rate
- Drop-off points
- Error frequency
- Average completion time 
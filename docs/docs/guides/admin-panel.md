# Admin Panel Documentation

This document provides comprehensive information about the admin panel in the Nastrih.cz booking system.

## Overview

The admin panel provides a centralized interface for managing:
- Bookings
- Services
- Opening Hours
- Customers
- Theme Customization
- System Settings

## Access and Authentication

### Authentication

The admin panel is protected by Next-Auth authentication:

```typescript
// Example authentication check
import { useSession } from 'next-auth/react';

function AdminPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin');
    },
  });
}
```

### Role-Based Access

Admin roles are defined in the database:
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  role      Role     @default(USER)
  // ... other fields
}

enum Role {
  USER
  ADMIN
  SUPER_ADMIN
}
```

## Navigation

The admin panel uses a consistent navigation structure through the `AdminNav` component:

### Main Sections:
- Dashboard (`/admin`)
- Bookings (`/admin/bookings`)
- Services (`/admin/services`)
- Opening Hours (`/admin/hours`)
- Customers (`/admin/customers`)
- Settings (`/admin/settings`)

## Features

### 1. Dashboard

The main overview page showing:
- Today's appointments
- Recent bookings
- Quick statistics
- System notifications

### 2. Bookings Management

Features for managing appointments:
- View all bookings
- Filter by date/status
- Edit booking details
- Cancel bookings
- Send notifications

### 3. Services Management

Control over service offerings:
- Add/edit services
- Set pricing
- Define duration
- Service descriptions
- Availability settings

### 4. Opening Hours

Manage business hours:
- Set regular hours
- Special holiday hours
- Temporary closures
- Break times

### 5. Customer Management

Customer database features:
- Customer profiles
- Booking history
- Contact information
- Notes and preferences

### 6. Theme Customization

Control over the booking interface appearance:
- Color schemes
- Typography
- Layout options
- Preview changes

## API Endpoints

### Bookings
```typescript
// Get all bookings
GET /api/admin/bookings

// Update booking
PUT /api/admin/bookings/:id
{
  status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  notes?: string;
}

// Delete booking
DELETE /api/admin/bookings/:id
```

### Services
```typescript
// Manage services
GET /api/admin/services
POST /api/admin/services
PUT /api/admin/services/:id
DELETE /api/admin/services/:id
```

### Opening Hours
```typescript
// Update hours
PUT /api/admin/hours
{
  day: string;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}
```

## Components

### AdminLayout
```typescript
interface AdminLayoutProps {
  children: React.ReactNode;
}

// Usage
export default function AdminPage() {
  return (
    <AdminLayout>
      <h1>Admin Content</h1>
    </AdminLayout>
  );
}
```

### DataTable
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column[];
  onRowClick?: (row: T) => void;
  sortable?: boolean;
  filterable?: boolean;
}
```

### ActionButton
```typescript
interface ActionButtonProps {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'danger';
  icon?: React.ComponentType;
}
```

## State Management

### Data Fetching
```typescript
// Example of data fetching in admin components
const { data, error, mutate } = useSWR('/api/admin/bookings');
```

### Form Handling
```typescript
// Example form state management
const [formData, setFormData] = useState({
  name: '',
  price: '',
  duration: 30,
});
```

## Error Handling

### API Errors
```typescript
try {
  await updateBooking(id, data);
} catch (error) {
  if (error.status === 403) {
    showError('Insufficient permissions');
  }
  // Handle other errors
}
```

### Validation
```typescript
const validateService = (data: ServiceData) => {
  const errors: Record<string, string> = {};
  if (!data.name) errors.name = 'Name is required';
  if (data.price < 0) errors.price = 'Invalid price';
  return errors;
};
```

## Best Practices

1. **Performance**
   - Implement pagination for large datasets
   - Use optimistic updates
   - Cache frequently accessed data

2. **Security**
   - Validate all input data
   - Check permissions for each action
   - Log important actions
   - Rate limit API endpoints

3. **UX Guidelines**
   - Provide clear feedback for actions
   - Implement undo functionality
   - Show loading states
   - Confirm destructive actions

4. **Code Organization**
   - Keep components focused
   - Share common utilities
   - Maintain consistent styling
   - Document complex logic

## Customization

### Adding New Features
1. Create new API endpoint
2. Add UI components
3. Update navigation
4. Add documentation

### Extending Existing Features
1. Modify API handlers
2. Update component props
3. Add new state management
4. Update tests

## Troubleshooting

### Common Issues:
1. Permission errors
2. Data synchronization
3. Form validation
4. API timeouts

### Solutions:
1. Verify user roles
2. Implement retry logic
3. Add input validation
4. Optimize queries

## Monitoring

### Key Metrics:
- API response times
- Error rates
- User actions
- Resource usage

### Logging:
```typescript
// Example logging
logger.info('Booking updated', {
  bookingId,
  userId: session.user.id,
  changes: data
});
```

## Future Improvements

Planned enhancements:
1. Advanced analytics
2. Bulk operations
3. Export functionality
4. Integration with external services 
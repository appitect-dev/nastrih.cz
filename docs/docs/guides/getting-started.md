# Getting Started

This guide will help you set up and run the Nastrih.cz barbershop booking system locally.

## Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- Git
- A code editor (VS Code recommended)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nastrih.cz.git
cd nastrih.cz
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nastrih"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Email (optional)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="your-email@example.com"
SMTP_PASSWORD="your-password"

# SMS (optional)
SMS_PROVIDER_API_KEY="your-api-key"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application should now be running at `http://localhost:3000`

## Project Structure

```
nastrih.cz/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   │   ├── admin/          # Admin interface components
│   │   ├── booking/        # Booking flow components
│   │   └── marketing/      # Marketing page components
│   ├── contexts/           # React contexts
│   ├── lib/                # Utility functions
│   └── styles/             # Global styles
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
└── docs/                   # Documentation
```

## Key Features

1. **Booking System**
   - Online appointment scheduling
   - Service selection
   - Time slot management
   - Customer information collection

2. **Admin Panel**
   - Appointment management
   - Service configuration
   - Schedule management
   - Customer database

3. **Theme System**
   - Customizable appearance
   - Real-time preview
   - Theme persistence

4. **Marketing Pages**
   - Landing page
   - Service showcase
   - Testimonials
   - Contact information

## Development Workflow

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run E2E tests
npm test:e2e
```

### Database Management
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma reset

# Open Prisma Studio
npx prisma studio
```

### Code Quality
```bash
# Run linter
npm run lint

# Run type checking
npm run type-check

# Format code
npm run format
```

## Deployment

### Production Build
```bash
# Create production build
npm run build

# Start production server
npm start
```

### Environment Setup
Ensure all required environment variables are set in your production environment.

### Database Migration
```bash
# Run production migrations
npx prisma migrate deploy
```

## Common Issues

### Database Connection
If you can't connect to the database:
1. Check DATABASE_URL in `.env.local`
2. Ensure PostgreSQL is running
3. Verify database exists

### Authentication
If authentication isn't working:
1. Verify NEXTAUTH_SECRET is set
2. Check NEXTAUTH_URL matches your domain
3. Ensure providers are properly configured

### Theme Not Loading
1. Check BookingThemeProvider is wrapping your app
2. Clear local storage
3. Verify theme context is imported correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Support

- GitHub Issues: [Report a bug](https://github.com/yourusername/nastrih.cz/issues)
- Email: support@nastrih.cz
- Documentation: [Full documentation](https://docs.nastrih.cz)

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 
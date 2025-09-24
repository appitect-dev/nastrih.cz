# Nastrih.cz Monorepo

This is the monorepo for Nastrih.cz, a modern barbershop booking system.

## Project Structure

```
nastrih.cz/
├── front/              # Frontend application (Next.js) - Reservation system
├── landing/            # Landing page (Next.js) - Marketing website
├── back/               # Backend application (Spring Boot)
└── docs/               # Documentation website (Docusaurus)
```

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nastrih.cz.git
cd nastrih.cz
```

2. Install dependencies for all packages:
```bash
npm install
```

### Development

Run all projects in development mode:
```bash
npm run dev
```

This will start:
- Frontend (reservation system) at http://localhost:3000
- Landing page at http://localhost:3001
- Documentation at http://localhost:3002
- Backend at http://localhost:8080

Or run specific projects:
```bash
# Frontend only (reservation system)
npm run front

# Landing page only
npm run landing

# Documentation only
npm run docs

# Backend only
npm run back
```

### Building

Build all projects:
```bash
npm run build
```

Or build specific projects:
```bash
# Frontend only
npm run build:front

# Documentation only
npm run build:docs
```

### Production

Start all projects in production mode:
```bash
npm run start
```

Or start specific projects:
```bash
# Frontend only
npm run start:front

# Documentation only
npm run start:docs
```

## Documentation

Visit the documentation at [http://localhost:3001](http://localhost:3001) when running locally.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

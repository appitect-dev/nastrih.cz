# Nastrih.cz Monorepo

This is the monorepo for Nastrih.cz, a modern barbershop booking system.

## Project Structure

```
nastrih.cz/
├── front/              # Frontend application (Next.js)
├── back/               # Backend application (coming soon)
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

Or run specific projects:
```bash
# Frontend only
npm run dev:front

# Documentation only
npm run dev:docs
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

# CI/CD Pipeline

Nastrih.cz uses GitHub Actions for continuous integration and deployment. The project is set up with automated workflows for testing, building, and deploying all components.

## Workflow Overview

### Continuous Integration

The main CI workflow (`ci.yml`) runs on every push to main and pull requests:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  frontend-checks:
    # Runs linting, tests, and build checks for frontend
  docs-checks:
    # Verifies documentation builds correctly
  backend-checks:
    # Runs tests and build verification for backend
```

### Frontend Deployment

The frontend is deployed to Vercel, which provides:
- Automatic deployments on push to main
- Preview deployments for pull requests
- Custom domain support
- Edge functions and serverless capabilities

### Backend Deployment

The backend is deployed to Render.com using Docker:

```yaml
name: Deploy Backend

on:
  push:
    branches: [ main ]
    paths:
      - 'back/**'

jobs:
  deploy:
    # Builds Docker image and deploys to Render.com
```

Configuration in Render:
- Free tier with 750 hours/month
- Automatic HTTPS
- Custom domain support
- Docker support
- Auto-deploy from Git

### Documentation Deployment

Documentation is deployed to GitHub Pages:

```yaml
name: Deploy Documentation

on:
  push:
    branches: [ main ]
    paths:
      - 'docs/**'

jobs:
  build:
    # Builds documentation site
  deploy:
    # Deploys to GitHub Pages
```

## Development Workflow

1. Create a feature branch from main
2. Make changes and commit
3. Create a pull request
4. CI checks run automatically
5. Review and merge
6. Automatic deployment based on changed files:
   - Frontend changes → Vercel deployment
   - Backend changes → Render deployment
   - Documentation changes → GitHub Pages deployment

## Monorepo Structure

The project uses a monorepo structure with three main components:
- `front/`: Next.js frontend
- `back/`: Spring Boot backend
- `docs/`: Docusaurus documentation

### Running All Services

Use the root `package.json` scripts to run all services:

```bash
# Install all dependencies
npm run install:all

# Run all services (frontend, backend, docs)
npm run dev
```

This will start:
- Frontend at http://localhost:3000
- Backend at http://localhost:8080
- Documentation at http://localhost:3001

## Environment Setup

Required environment variables:
- Frontend: Set in Vercel dashboard
- Backend: Configured in Render.com
- Documentation: No environment variables needed

## Deployment URLs

- Frontend: https://nastrih.cz
- Backend API: https://api.nastrih.cz
- Documentation: https://appitect-dev.github.io/nastrih.cz/ 
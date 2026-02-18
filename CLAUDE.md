# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start Vite development server
npm run build        # Build for production (runs TypeScript compiler + Vite build)
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
```

## Architecture Overview

This is a **React + TypeScript frontend** using a **Modular Architecture** pattern. The codebase is organized into self-contained modules that encapsulate related functionality.

### Module Structure Pattern
Each module follows this standardized structure:
```
src/modules/[module-name]/
├── api/           # API layer and external service calls
├── services/      # React Query hooks and business logic
├── ui/            # React components specific to this module
├── types/         # TypeScript type definitions
├── schemas/       # Zod validation schemas
├── constants/     # Module-specific constants (including query keys)
└── mock/          # Mock data for development/testing
```

### Key Technologies & Patterns

- **State Management**: TanStack Query (React Query) for server state, React Hook Form for form state
- **UI Framework**: Radix UI components with Tailwind CSS styling
- **Validation**: Zod schemas for form validation and type safety
- **Authentication**: Auth0 React for user authentication
- **Routing**: React Router DOM with protected/public route guards
- **Path Aliases**: `@/*` maps to `src/*` (configured in vite.config.ts and tsconfig.json)

### Import Organization
ESLint enforces strict import ordering:
1. Node.js built-ins
2. External packages
3. Internal absolute imports (`@/modules/**`, `@/**`)
4. Parent relative imports
5. Sibling relative imports
6. Index imports

Always use alphabetical ordering within groups.

### Code Style
- Uses Airbnb ESLint config with TypeScript extensions
- Prettier for code formatting
- Named exports preferred over default exports
- Function components can use either function declarations or arrow functions
- JSX props spreading is allowed
- React imports not required (automatic JSX runtime)

### Component Library Structure
- Reusable UI components in `src/components/`
- Form components in `src/components/_form/`
- React Hook Form components in `src/components/_rhf/`
- Each component has its own directory with index.ts for exports

### Authentication Flow
- Auth0 integration with custom context provider
- Route guards: `AuthGuard` for protected routes, `GuestGuard` for public-only routes
- Multiple auth methods: Email, Phone, Google OAuth
- OTP verification for phone/email authentication

### Data Fetching Patterns
- All API calls use React Query with standardized query keys
- API layer separated from service hooks
- Pagination and filtering built into data tables
- Optimistic updates for mutations

## Key Directories

- `src/modules/` - Feature modules (currently: base, product)
- `src/components/` - Reusable UI component library
- `src/pages/` - Page components organized by Auth/Protected/Public/Error
- `src/auth/` - Authentication context, hooks, and guards
- `src/routes/` - Routing configuration
- `src/providers/` - Context providers
- `src/lib/` - Utility libraries and configurations

## Development Notes

- TypeScript strict mode enabled with unused locals/parameters checks
- Husky git hooks configured for code quality
- Uses Vite for fast development and building
- All paths use absolute imports with `@/` prefix
- Form validation uses Zod schemas with React Hook Form resolvers
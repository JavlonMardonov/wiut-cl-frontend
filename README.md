# Template React Frontend

A modern, scalable React frontend template built with TypeScript, featuring a modular architecture and comprehensive UI component library.

## 🏗️ Architecture

This project follows a **Modular Architecture** pattern, organizing code into self-contained modules that encapsulate related functionality. Each module contains its own API layer, services, UI components, types, and schemas.

### Module Structure

```
src/modules/[module-name]/
├── api/           # API layer and external service calls
├── services/      # React Query hooks and business logic
├── ui/            # React components specific to this module
├── types/         # TypeScript type definitions
├── schemas/       # Validation schemas (Zod)
├── constants/     # Module-specific constants
└── mock/          # Mock data for development/testing
```

### Example: Product Module

The `src/modules/product` module demonstrates this architecture:

- **API Layer** (`api/productsAPI.ts`): Handles all product-related API calls
- **Services** (`services/`): React Query hooks for data fetching and mutations
  - `getProducts.ts` - Fetch products with pagination and filtering
  - `createProduct.ts` - Create new products
  - `updateProduct.ts` - Update existing products
  - `deleteProduct.ts` - Delete products
  - `getProductById.ts` - Fetch single product
- **UI Components** (`ui/`): React components for product functionality
  - `ProductsTable.tsx` - Data table with sorting and pagination
  - `CreateProduct.tsx` - Product creation form dialog
  - `UpdateProduct.tsx` - Product editing form dialog
  - `DeleteProduct.tsx` - Product deletion confirmation dialog
- **Types** (`types/`): TypeScript interfaces and types
- **Schemas** (`schemas/`): Zod validation schemas for forms

## 🚀 Tech Stack

### Core Framework
- **React 18.3.1** - UI library with latest features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server

### State Management & Data Fetching
- **TanStack Query (React Query) 5.83.0** - Server state management
- **React Hook Form 7.53.1** - Form state management
- **Zod 3.23.8** - Schema validation

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Framer Motion 11.12.0** - Animation library
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Routing & Navigation
- **React Router DOM 6.27.0** - Client-side routing

### Authentication
- **Auth0 React 2.2.4** - Authentication provider

### Development Tools
- **ESLint** - Code linting with Airbnb config
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript ESLint** - TypeScript-specific linting

### Internationalization
- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next

## 📁 Project Structure

```
src/
├── modules/           # Feature modules (modular architecture)
│   ├── base/         # Base types and utilities
│   └── product/      # Product management module
├── components/       # Reusable UI components
│   ├── _form/       # Form-related components
│   ├── _rhf/        # React Hook Form components
│   └── [ui-components]/ # Individual UI components
├── pages/           # Page components
├── routes/          # Routing configuration
├── hooks/           # Custom React hooks
├── services/        # Global services (React Query client)
├── providers/       # Context providers
├── auth/            # Authentication logic
├── lib/             # Utility libraries
├── assets/          # Static assets
└── i18n/           # Internationalization files
```

## 🎨 Component Library

The project includes a comprehensive component library built on top of Radix UI:

### Form Components
- Form validation with React Hook Form + Zod
- TextField, TextAreaField, NumberField, SelectField
- Date pickers, file uploads, phone number inputs

### UI Components
- Buttons, Cards, Dialogs, Drawers
- Tables with sorting and pagination
- Navigation (Sidebar, Tabs)
- Feedback (Alerts, Toasts, Loading states)
- Data display (Badges, Avatars, Progress bars)

## 🔧 Development

### Prerequisites
- Node.js (Latest LTS)
- pnpm (recommended) or npm

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
```

## 🏛️ Architectural Benefits

### Modular Architecture Advantages
1. **Scalability** - Easy to add new features as separate modules
2. **Maintainability** - Clear separation of concerns
3. **Reusability** - Modules can be reused across projects
4. **Team Collaboration** - Teams can work on different modules independently
5. **Testing** - Each module can be tested in isolation

### Code Organization
- **Separation of Concerns** - API, business logic, and UI are clearly separated
- **Type Safety** - Full TypeScript coverage with strict configuration
- **Consistent Patterns** - Standardized structure across all modules
- **Developer Experience** - Clear file organization and naming conventions

## 🔒 Authentication

The project uses Auth0 for authentication with the following features:
- Social login providers
- JWT token management
- Protected routes
- User profile management

## 🌐 Internationalization

Built-in i18n support with:
- Multiple language support
- Automatic language detection
- Namespace-based translations
- RTL language support

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Responsive components and layouts
- Touch-friendly interactions
- Progressive Web App capabilities

## 🚀 Production Ready

- Optimized build with Vite
- Code splitting and lazy loading
- Performance monitoring
- Error boundaries
- SEO optimization

---

This template provides a solid foundation for building scalable React applications with modern development practices and a clean, maintainable architecture.

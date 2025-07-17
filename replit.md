# DompetKu - Personal Finance Management Application

## Overview

DompetKu is a comprehensive personal finance management application built with a modern full-stack architecture. It provides users with the ability to track transactions, manage savings goals, analyze spending patterns, and maintain complete control over their financial data through an offline-first approach.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **Charts**: Chart.js for data visualization
- **PDF Export**: jsPDF for transaction reports

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Session-based authentication with bcrypt for password hashing
- **Validation**: Zod schemas for runtime type checking
- **Development**: Hot reload with Vite middleware integration

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for type sharing between client and server
- **Tables**: Users, transactions, savings goals, and user settings
- **Relationships**: Foreign key constraints linking users to their data

## Key Components

### Core Features
1. **User Management**: Registration, login, and authentication
2. **Transaction Tracking**: Income and expense management with categories
3. **Savings Goals**: Target-based saving with progress tracking
4. **Analytics**: Monthly income/expense charts and category breakdowns
5. **Privacy Controls**: Toggle privacy mode and dark/light themes
6. **Export Functionality**: PDF generation for financial reports

### Data Models
- **Users**: Basic profile information with authentication
- **Transactions**: Income/expense records with categories and dates
- **Savings Goals**: Target amounts with progress tracking
- **User Settings**: Privacy preferences and theme settings

### Security Features
- **Password Security**: bcrypt hashing for user passwords
- **Session Management**: Server-side session storage
- **Input Validation**: Zod schemas for all API endpoints
- **CSRF Protection**: Session-based authentication with credentials

## Data Flow

### Authentication Flow
1. User registration creates hashed password and user record
2. Login validates credentials and creates server session
3. Protected routes check session validity
4. Logout destroys session and redirects

### Transaction Management
1. Client submits transaction data via forms
2. Server validates input using Zod schemas
3. Database stores transaction linked to user ID
4. TanStack Query manages client-side cache updates
5. UI reflects changes immediately with optimistic updates

### Data Visualization
1. Transaction data fetched from API
2. Chart.js processes data for visualization
3. Monthly and category-based charts render
4. Real-time updates when transactions change

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React ecosystem with TypeScript
- **Styling**: Tailwind CSS with PostCSS processing
- **State Management**: TanStack Query for server state
- **Form Management**: React Hook Form with Zod validation
- **Charts**: Chart.js for data visualization
- **PDF Export**: jsPDF for report generation
- **Icons**: Lucide React for consistent iconography

### Backend Dependencies
- **Database**: Neon PostgreSQL (serverless PostgreSQL)
- **ORM**: Drizzle ORM with PostgreSQL adapter
- **Authentication**: bcrypt for password hashing
- **Session Storage**: connect-pg-simple for PostgreSQL sessions
- **Validation**: Zod for runtime type checking

### Development Tools
- **Build**: Vite for development and production builds
- **TypeScript**: Full type safety across the stack
- **ESLint/Prettier**: Code formatting and linting
- **Hot Reload**: Vite middleware for development experience

## Deployment Strategy

### Build Process
1. Frontend builds to `dist/public` using Vite
2. Backend compiles to `dist/index.js` using esbuild
3. Database migrations managed through Drizzle Kit
4. Environment variables handle database connection

### Production Configuration
- **Database**: Neon PostgreSQL with connection pooling
- **Server**: Express.js serving static files and API routes
- **Environment**: NODE_ENV=production for optimizations
- **Assets**: Static files served from dist/public

### Development Setup
- **Database**: Local PostgreSQL or development environment
- **Hot Reload**: Vite middleware integration
- **TypeScript**: Shared types between client and server
- **Development Server**: tsx for TypeScript execution

### Privacy and Security Considerations
- **Data Locality**: All financial data stored in user-controlled database
- **No External APIs**: No third-party financial service integrations
- **Offline Capability**: Core functionality works without internet
- **Session Security**: Secure session management with PostgreSQL storage
- **Input Validation**: Comprehensive validation on all user inputs

The application prioritizes user privacy and data control while providing a comprehensive set of financial management tools through a modern, responsive web interface.
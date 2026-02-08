# CC-SWAPI Project Description

## Overview

**YASWAPI-APP** Yet another SWAPI App (Coding Challenge - Star Wars API) is a Next.js web application. Since It was completely up to me what I do i was a little lost and decided to showcase a modern, server-side rendered approach to consuming third-party APIs. The project demonstrates best practices in accessibility, architecture, and testing while building a Star Wars Encyclopedia. Of course a little chaotic because of the small timeframe.

Just in case you did not noticed this is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

**TL;DR**:

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Purpose

This project serves as a coding challenge implementation with the following key objectives:

1. **Non-SPA Approach**: All API calls are performed server-side, avoiding traditional Single Page Application architecture
2. **Accessibility Focus**: Built with a11y (web accessibility) as a primary concern
3. **Enterprise-Grade Structure**: Implements patterns like data mappers, fetchers, and feature-based organization
4. **Testing & Quality**: Includes comprehensive test coverage and linting
5. **Showcase**: Demonstrates production-ready patterns for consuming third-party APIs with Next.js

## Technology Stack

### Core Framework & Runtime

- **Next.js 16.1.6**: React framework with server-side rendering and API routes
- **React 19.2.3**: UI library
- **TypeScript**: Type-safe development

### UI & Styling

- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Class Variance Authority**: Type-safe component styling patterns

### Testing & Quality Assurance

- **Vitest**: Fast unit testing framework
- **MSW (Mock Service Worker)**: API mocking for tests
- **@testing-library**: React testing utilities
- **vitest-axe**: Accessibility testing
- **ESLint & Prettier**: Code quality and formatting

## Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── films/             # Film listing and detail pages
│   │   └── [id]/          # Dynamic film detail routes
│   │       └── components # route specific components
├── components/            # Reusable React components
│   ├── data-display/      # Components for displaying data
│   ├── layout/            # Layout components (navigation, etc.)
│   └── ui/                # Low-level UI components (shadcn/Radix based)
├── features/              # Feature-based modules
│   ├── common/            # Shared API utilities
│   ├── films/             # Films feature (API, hooks, mappers, types)
│   ├── people/            # People feature (partially implemented)
│   ├── planets/           # Planets feature types (partially implemented)
│   ├── species/           # Species feature types (partially implemented)
│   └── vehicles/          # Vehicles feature types (partially implemented)
├── lib/                   # Utility libraries
│   ├── api/               # API client and types
│   ├── utils/             # Helper functions
│   ├── logging/           # Logging utilities
│   └── config.ts          # Application configuration
└── styles/                # Global CSS
```

## Data Source

The application consumes the **SWAPI (Star Wars API)** at `https://swapi.dev/api`:
- Films
- People
- Planets
- Species
- Vehicles

## Key Features

### Implemented
- **Films Page**: Display list of Star Wars films
- **Film Details**: Detailed view of individual films
- **Related Characters**: View characters associated with films
- **Related Planets**: View planets featured in films
- **Server-Side Rendering**: All data fetching happens server-side
- **Automatic Caching**: Next.js handles fetch call caching with revalidation

### Planned/Partial Implementation

- **People Page**: Character browsing and details
- **Streaming**: Server component streaming for improved UX
- **Additional Features**: Expand to cover more resources

## Architecture Patterns

### Data Flow Pattern

1. **API Layer** (`src/features/*/api.ts`): Raw API communication
2. **Mappers** (`src/features/*/mappers.ts`): Transform API responses to application types
3. **Types** (`src/features/*/types.ts`): TypeScript type definitions
4. **Hooks** (`src/features/*/hooks.ts`): React hooks for data fetching
5. **Components**: Consume processed data

### Component Organization

_Need a little work right now it is a bit chaotic._

- **UI Components**: Reusable, unstyled primitives from Radix UI
- **Data Display Components**: Feature-specific components for displaying data
- **Layout Components**: Navigation and page structure

### API Integration

- **Centralized Configuration**: `src/lib/config.ts` contains API endpoints
- **API Client**: `src/lib/api/swapi-client.ts` for client instantiation for simple interaction with the SWAPI Api

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Lint code
npm run lint
npm run lint:fix

# Build for production
npm build

# Start production server
npm start
```

## Code Quality Standards

- **Linting**: ESLint with Next.js configuration
- **Formatting**: Prettier integration
- **Testing**: Vitest with React Testing Library
- **Accessibility**: Built-in a11y testing with vitest-axe
- **Type Safety**: Full TypeScript coverage

## Future Enhancements

Based on the TODO notes in the project:

1. Complete People and other resource pages
2. Improve component file structure organization
3. Expand test coverage for all features
4. Add more sophisticated error boundaries
5. add renovate and github actions
6. adhere more to [conventional commits](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13#examples)

## Design Philosophy

- **Server-Centric**: Leverages Next.js for server-side rendering and API integration
- **Accessible First**: Builds on Radix UI primitives for accessibility
- **Type-Safe**: Full TypeScript implementation prevents runtime errors
- **Testable**: Enterprise structure makes components and logic easily testable
- **Maintainable**: Feature-based organization and separation of concerns

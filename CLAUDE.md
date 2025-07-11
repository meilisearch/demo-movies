# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Meilisearch movie search demo application** called "Where to Watch" that showcases Meilisearch's search capabilities including hybrid search (keyword + semantic/vector search) with a modern Next.js frontend.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript/JavaScript (mixed, transitioning to TypeScript)
- **Search**: Meilisearch with React InstantSearch
- **Styling**: Styled Components + Tailwind CSS
- **State Management**: React Context API
- **Runtime**: Node.js with Bun for scripts
- **Testing**: Cypress for E2E tests

## Development Commands

### Initial Setup
```bash
# Install dependencies
yarn install

# Configure Meilisearch settings (run once)
yarn setup:settings

# Seed movie data
yarn setup
```

### Development
```bash
# Start development server (port 3000)
yarn dev

# Run with test environment
yarn ci:dev

# Start Storybook component development
yarn storybook
```

### Testing
```bash
# Run Cypress E2E tests (requires running Meilisearch)
yarn test

# Open Cypress in interactive mode
yarn test:watch

# Run specific Cypress test
yarn cy:run --spec cypress/e2e/movie-list.cy.js
```

### Code Quality
```bash
# Run ESLint
yarn lint

# Fix linting issues automatically
yarn lint:fix
```

### Build & Deploy
```bash
# Create production build
yarn build

# Start production server
yarn start
```

### Utility Scripts
```bash
# Generate React components from SVG icons
yarn icons

# Build Storybook static site
yarn build-storybook
```

## Architecture

### Directory Structure
```
src/
├── components/      # React components (mix of .js and .tsx)
│   ├── Header/     # Main navigation
│   ├── Dialog/     # Movie details modal
│   ├── Results/    # Search results display
│   └── icons/      # SVG icons as React components
├── context/        # React contexts
│   ├── ClientContext.js      # Meilisearch client
│   ├── LanguageContext.js    # i18n language
│   ├── MovieContext.js       # Selected movie state
│   └── SemanticRatioContext.js # Hybrid search ratio
├── hooks/          # Custom React hooks
├── lib/            # Meilisearch client setup
├── pages/          # Next.js pages
├── theme/          # Styled components theme
└── utils/          # Helper functions
```

### Key Architectural Patterns

1. **Hybrid Search Implementation**
   - Uses Meilisearch's hybrid search combining keyword and vector search
   - Semantic search powered by OpenAI embeddings
   - Adjustable semantic ratio via context and UI slider

2. **Multi-language Support**
   - Separate Meilisearch indexes for each language (movies-en, movies-ja, movies-th)
   - Next.js i18n configuration in `next.config.js`
   - Language switching affects both UI and search index

3. **State Management**
   - Client context provides Meilisearch instance to all components
   - Movie context manages selected movie for detail view
   - Semantic ratio context controls hybrid search behavior

4. **Component Architecture**
   - Mix of JavaScript and TypeScript components (gradual migration)
   - Styled Components for component-specific styles
   - Tailwind CSS for utility classes
   - Reakit for accessible UI primitives

## Environment Variables

Required variables (create `.env` from `.env.example`):
```bash
# Meilisearch configuration
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=your_search_key
MEILISEARCH_ADMIN_API_KEY=your_admin_key

# For semantic search
OPENAI_API_KEY=your_openai_key

# Optional
NEXT_PUBLIC_TWICPICS_DOMAIN=your_domain
NEXT_PUBLIC_FATHOM_TRACKING_CODE=your_code
NEXT_PUBLIC_MEILISEARCH_EMBEDDER=default
```

## TypeScript Configuration

The project uses path aliases configured in `tsconfig.json`:
- `@/` → `./src/`
- `components/` → `./src/components/`
- `context/` → `./src/context/`
- `hooks/` → `./src/hooks/`
- `theme/` → `./src/theme/`
- `utils/` → `./src/utils/`

Note: TypeScript is configured with `strict: false` as the codebase is gradually migrating from JavaScript.

## Testing Strategy

### E2E Tests with Cypress
- Tests located in `cypress/e2e/`
- Requires running Meilisearch instance
- Tests cover movie list display and movie detail modal functionality
- Environment variables configured in `cypress.config.js`

### Running Tests
```bash
# Start Meilisearch in Docker
docker run -it --rm -p 7700:7700 getmeili/meilisearch:latest meilisearch --env="development"

# In another terminal, run tests
yarn test
```

## Data Seeding Process

1. **Settings Configuration** (`yarn setup:settings`)
   - Creates indexes with proper settings for each language
   - Configures searchable attributes, filterable attributes, and sorting

2. **Data Import** (`yarn setup`)
   - Loads movie data from `assets/movies-*.json` files
   - Generates embeddings for semantic search (if OpenAI key provided)
   - Indexes data into language-specific indexes

## Key Components

### Search Implementation
- `src/lib/meilisearch.js` - Client initialization with hybrid search support
- `src/components/Results/` - Search results display with InstantSearch
- `src/components/Dialog/` - Movie detail modal with similar movies

### Context Providers
- Wrap entire app in `pages/_app.js`
- Provide Meilisearch client, language, and search configuration
- Must be maintained when adding new global state

## Development Tips

### Adding New Components
1. Check existing components for patterns (prefer functional components)
2. Use TypeScript for new components (`.tsx` extension)
3. Follow existing styling patterns (Styled Components + Tailwind)
4. Add to Storybook if creating reusable UI components

### Modifying Search Behavior
1. Search configuration in `src/lib/meilisearch.js`
2. Index settings in `scripts/update-settings.ts`
3. Search UI components in `src/components/Results/`

### Working with Translations
1. Translation files in `public/locales/[lang]/`
2. Use `next-i18next` for component translations
3. Language context affects search index selection

## AI Movie Advisor Chat Integration

The application includes an AI-powered chat feature that provides movie recommendations through natural conversation.

### Architecture
- **Component**: `src/components/ChatPanel/` - Integrated chat panel with responsive layout
- **API**: Uses Meilisearch's `/chats/{workspace}/chat/completions` endpoint
- **State**: Chat state managed locally within the component
- **Layout**: Automatically adjusts main content width when chat is open

### Key Features
1. **Conversational Interface**
   - Real-time streaming responses
   - Search progress indicators showing which queries are being run
   - Movie source carousel displaying which movies informed the response

2. **Movie Source Display**
   - `MovieCarousel` component shows referenced movies
   - Clickable movie cards that open detail modal
   - Horizontal scrolling with navigation buttons

3. **Layout Integration**
   - Chat panel slides in from the right
   - Main content resizes to prevent overlap
   - Movie grid adjusts from 8 to 4 columns when chat is open
   - Mobile responsive with full-screen chat on small devices

### Implementation Details
- Uses Server-Sent Events (SSE) for streaming responses
- Parses tool calls for `_meiliSearchProgress` and `_meiliSearchSources`
- Example queries auto-submit on click for better UX
- Styled with CSS-in-JS using styled-components
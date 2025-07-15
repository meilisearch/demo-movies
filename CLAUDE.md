# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎬 Project Overview

**Where to Watch** is a Next.js demo application showcasing Meilisearch's hybrid search capabilities. It's a movie search interface with semantic + keyword search, supporting multiple languages (English, Japanese, Thai).

## 🚀 Development Commands

### Initial Setup
```bash
# Install dependencies
yarn

# Set up environment variables
cp .env.example .env
# Edit .env with your Meilisearch credentials

# Run Meilisearch locally
docker run -it --rm -p 7700:7700 getmeili/meilisearch:latest meilisearch --env="development"

# Configure search settings (required once)
yarn setup:settings

# Seed movie data
yarn setup
```

### Development Workflow
```bash
# Start development server
yarn dev                    # http://localhost:3000

# Run tests (requires Meilisearch running)
yarn test                   # Cypress tests
yarn test:watch            # Interactive Cypress

# Code quality
yarn lint                   # ESLint check
yarn lint:fix              # Auto-fix

# Build
yarn build                  # Production build
yarn start                  # Start production server

# Component development
yarn storybook              # Storybook on port 6006
yarn icons                  # Generate React components from SVGs
```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14, React 18, Mixed TypeScript/JavaScript
- **Styling**: Styled Components + Tailwind CSS
- **Search**: Meilisearch with React InstantSearch
- **State**: React Context API
- **Testing**: Cypress E2E
- **Scripts**: Bun runtime

### Key Directories
- `src/pages/` - Next.js pages
- `src/components/` - React components
- `src/context/` - React Context providers (Client, Language, Movie, SemanticRatio)
- `src/hooks/` - Custom hooks for Meilisearch integration
- `scripts/` - Setup scripts using Bun
- `cypress/e2e/` - E2E test files

## 🔍 Meilisearch Integration

### Hybrid Search Configuration
The app implements hybrid search combining:
- **Keyword search**: Traditional text matching
- **Semantic search**: OpenAI embeddings (text-embedding-ada-002)
- **Semantic ratio**: User-adjustable (0-1 slider in UI)

### Key Integration Points
- **Client**: `src/lib/createMeilisearchClient.ts`
- **Hooks**: `src/hooks/useMeilisearch.ts`
- **Settings**: `scripts/update-settings.ts` (embedder configuration)
- **Indexes**: Language-specific (movies-en-US, movies-ja-JP, movies-th-TH)

### Environment Variables
```bash
MEILISEARCH_HOST=http://0.0.0.0:7700
MEILISEARCH_API_KEY=searchKey
MEILISEARCH_ADMIN_API_KEY=adminKey
OPENAI_API_KEY=openAIKey  # Required for semantic search

# Public variables (exposed to browser)
NEXT_PUBLIC_MEILISEARCH_HOST=...
NEXT_PUBLIC_MEILISEARCH_API_KEY=...
```

## 🧪 Testing

### Cypress E2E Tests
```bash
# Ensure Meilisearch is running first!
docker run -it --rm -p 7700:7700 getmeili/meilisearch:latest meilisearch --env="development"

# Run specific test
yarn cypress run --spec "cypress/e2e/movies_list.cy.js"

# Test coverage includes:
# - Movie search functionality
# - Language switching
# - Theme toggling
# - Modal interactions
# - LocalStorage persistence
```

## ⚠️ Important Notes

1. **Setup Order**: Must run `yarn setup:settings` before `yarn setup`
2. **Meilisearch Version**: Requires ≥ 1.13 for hybrid search
3. **API Keys**: Need both search and admin keys
4. **OpenAI Integration**: Required for semantic search features
5. **Mixed Codebase**: TypeScript and JavaScript coexist - maintain consistency with existing patterns

## 🔧 Common Development Tasks

### Adding New Components
1. Create component in `src/components/`
2. Add Storybook story in `src/stories/`
3. Use existing styled-components patterns

### Modifying Search Behavior
1. Update hooks in `src/hooks/useMeilisearch.ts`
2. Adjust embedder settings in `scripts/update-settings.ts`
3. Test with different semantic ratios

### Working with Translations
1. Translations in `public/locales/`
2. Use `next-i18next` for i18n
3. Language switching persists to localStorage

## 🤖 AI Movie Advisor Chat Integration

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
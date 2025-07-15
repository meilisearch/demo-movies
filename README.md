<p align="center">
  <img src="public/images/logo-light-mode.svg" alt="MeiliSearch logo" width="200" height="200" />
</p>

<h1 align="center">Where to Watch</h1>

<h4 align="center">
  <a href="https://github.com/meilisearch/MeiliSearch">MeiliSearch</a> |
  <a href="https://docs.meilisearch.com">Documentation</a> |
  <a href="https://slack.meilisearch.com">Slack</a> |
  <a href="https://www.meilisearch.com">Website</a> |
  <a href="https://docs.meilisearch.com/faq">FAQ</a>
</h4>

<p align="center">
  <a href="https://github.com/meilisearch/demo-movies/blob/main/LICENCE"><img src="https://img.shields.io/badge/license-MIT-informational" alt="License"></a>
</p>
<br/>

<p align="center" style="font-weight:bold;" >Where to Watch</p>

**Table of Contents**:

- [Setup](#setup)
  - [Install dependencies](#install-dependencies)
  - [Run Meilisearch](#run-meilisearch)
  - [Import movies](#import-movies)
- [Run](#run)
- [Build](#build)
  - [Generate build](#generate-build)
  - [Run your build](#run-your-build)
- [Features](#features)
  - [AI Movie Advisor](#ai-movie-advisor)
- [Environment variables](#environment-variables)
- [Compatibility with Meilisearch](#compatibility-with-meilisearch)
- [Storybook](#storybook)

<br/>

## Setup

### Install dependencies

```bash
yarn
```

### Run Meilisearch

You can run a Meilisearch instance locally with the following command:

```
docker run -it --rm \
    -p 7700:7700 \
    getmeili/meilisearch:latest \
    meilisearch --env="development"
```

### Import movies

Run the following script to create the different indexes and upload the movies documents:

You need to run this command at least once to create the correct indexing settings:
`yarn setup:settings`

Then run the setup to index the data:
`yarn setup`

## Run

```bash
yarn dev
```

Go to `http://localhost:3000/` and enjoy! 🎉

## Build

### Generate build

You can generate a build of this project with the following command:

```bash
yarn build
```

### Run your build

You can serve the generated build with:

```bash
yarn start
```

Or serve it with any web server of your choice.

Example:

```bash
serve .next
```

## Features

### AI Movie Advisor

The demo includes an integrated AI-powered movie advisor chat feature that helps users discover movies through natural conversation. 

**Key capabilities:**
- Ask for movie recommendations based on mood, genre, or similarity to other films
- Get personalized suggestions with visual movie cards showing the sources
- See which movies the AI referenced when crafting its response

**Example queries:**
- "Movies similar to Inception"
- "Show me feel-good family movies"
- "Best sci-fi movies from 2023"

The chat panel seamlessly integrates with the search interface, automatically adjusting the layout to ensure all content remains visible.

## Environment variables

To connect to your own Meilisearch instance, two environment variables should be provided:

- `MEILISEARCH_HOST`: the URL of your Meilisearch instance
- `MEILISEARCH_API_KEY`: an API key with at least search rights

You can copy the existing `.env.example` file as `.env` and update the values accordingly.

## Compatibility with Meilisearch

This demo only guarantees compatibility with Meilisearch versions ≥ 1.13.

## Storybook

Storybook is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively test components.

```bash
yarn storybook
```

## Testing

Tests are implemented using Cypress. To run the tests, first **launch a Meilisearch instance**, then run:

```bash
yarn test
```

**Environment variables**

Environment variables are configured in `cypress.config.js`:

```js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // ...
  env: {
      MEILISEARCH_HOST: 'http://0.0.0.0:7700',
      MEILISEARCH_API_KEY: 'masterKey',
    }
}
```

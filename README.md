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
- [Environment variables](#environment-variables)
- [Run](#run)
- [Build](#build)
  - [Generate build](#generate-build)
  - [Run your build](#run-your-build)
- [Storybook](#storybook)

<br/>

## Setup

```bash
yarn
```

or

```bash
npm install
```

## Environment variables

This project needs 2 environment variables to connect to your Meilisearch instance and retrieve the movies:

- HOST
- API_KEY

An example can be found in the `.env.example` file. You can either rename this file into `.env`, or create a new file.

## Run

```bash
yarn dev
```

or

```bash
npm run dev
```

Go to `http://localhost:3000/` and enjoy ! 🎉

## Build

### Generate build

You can generate a build of this project with the following command:

```bash
yarn build
```

or

```bash
npm run build
```

### Run your build

The above commands will generate an optimized version of the app, inside the `.next` folder.

You can then serve it with:

```bash
yarn start
```

or

```bash
npm run start
```

Or serve it with any web server of your choice.

Example:

```bash
serve .next
```

## Storybook

Storybook is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively test components.

```bash
yarn storybook
```

or

```bash
npm run storybook
```

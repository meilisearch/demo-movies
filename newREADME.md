# Meilisearch Starter – Movies

A developer directory built on [Next.js](https://nextjs.org/) and [Meilisearch](https://www.meilisearch.com), deployed on [Vercel](https://vercel.com/) with the [Vercel + Meilisearch integration](https://vercel.com/integrations/meilisearch).

-- todo add picture --

## Deployment Instructions

You will need to create a [GitHub OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) to use this starter. Here are the steps:

1. Go to https://github.com/settings/developers and create a new OAuth application
2. Name your application **"Meilisearch Starter"**
3. Set the homepage URL to **`https://vercel.app`** for now (we'll change this later)
4. Set the authorization callback URL to **`https://vercel.app/api/auth/callback/github`** for now (we'll change this later)
5. Click "Register application".
6. Once the application is created, copy the "Client ID". This will be your **`GITHUB_CLIENT_ID`**.
7. Generate a new client secret and copy that too. This will be your **`GITHUB_CLIENT_SECRET`**.
8. Generate a random secret [here](https://generate-secret.vercel.app/32). This will be your **`NEXTAUTH_SECRET`**.
9. Click on this button below to clone and deploy this template to Vercel.
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCaroFG%2Fwhere2watch&project-name=meilisearch-starter&repository-name=meilisearch-starter)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCaroFG%2Fwhere2watch&project-name=meilisearch-starter&repository-name=meilisearch-starter&integration-ids=oac_rwEl59xztJi8dRne84Aqaw1r)

10. Once your application is deployed, **edit the homepage & callback URLs in your GitHub OAuth App to match your deployment URL**.

## Demo

https://where2watch.meilisearch.com/

## Vercel + Meilisearch Integration

https://vercel.com/integrations/meilisearch

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Styled Components](https://styled-components.com/)
- [Meilisearch](https://www.meilisearch.com)
- [Vercel](https://vercel.com/)

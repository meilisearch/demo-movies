# Contributing <!-- omit in toc -->

---

First of all, thank you for contributing to MeiliSearch! The goal of this document is to provide everything you need to know in order to contribute to MeiliSearch and its different integrations.

- [Assumptions](#assumptions)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Git Guidelines](#git-guidelines)

## Assumptions

1. **You're familiar with [GitHub](https://github.com) and the [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests)(PR) workflow.**
2. **You've read the MeiliSearch [documentation](https://docs.meilisearch.com) and the [README](/README.md).**
3. **You know about the [MeiliSearch community](https://docs.meilisearch.com/learn/what_is_meilisearch/contact.html). Please use this for help.**

## How to Contribute

1. Make sure that the contribution you want to make is explained or detailed in a GitHub issue! Find an [existing issue](https://github.com/meilisearch/demo-movies/issues/) or [open a new one](https://github.com/meilisearch/demo-movies/issues/new).
2. Once done, [fork the demo-movies repository](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) in your own GitHub account. Ask a maintainer if you want your issue to be checked before making a PR.
3. [Create a new Git branch](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository).
4. Review the [Development Workflow](#workflow) section that describes the steps to maintain the repository.
5. Make the changes on your branch.
6. [Submit the branch as a PR](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) pointing to the `main` branch of the main demo-movies repository. A maintainer should comment and/or review your Pull Request within a few days. Although depending on the circumstances, it may take longer.<br>
   We do not enforce a naming convention for the PRs, but **please use something descriptive of your changes**, having in mind that the title of your PR will be automatically added to the next [release changelog](https://github.com/meilisearch/demo-movies/releases/).

## Development Workflow

### Setup <!-- omit in toc -->

```bash
yarn
```

or

```bash
npm install
```

### Tests and Linter <!-- omit in toc -->

Each PR should pass the linter to be accepted.

```bash
yarn lint
```

or :

```bash
npm run lint
```

### Storybook <!-- omit in toc -->

This project's components are in Storybook. If you edit one of the components, please make sure that storybook is still up-to-date.

```bash
yarn storybook
```

or :

```bash
npm run storybook
```

### Internationalization

To add a new language, add it inside the `locales` array of the `next-i18next.config.js` file.
Then, the easiest way to add the translations is to duplicate one of the existing folder inside `public/locales` and translate its content.
For example, you might want to duplicate the `en` folder and rename it in `fr`. Then, you can translate its content.
Don't forget to restart your server to see your changes !

### Adding a new Country

If you want to add a new country, you first have to make sure that the Meilisearch instance contains the documents for the given country, in an index of the form `movie-${lang}-${country}`.
Then you can add your new country by doing the following:

- add your new country flag inside the `public/images/flags/` folder (png format)
- add your new country inside the `src/constants.ts` file

This will automatically add the new country inside the country dropdown, and make the switch between indexes for search when you switch from one country to an other.

## Git Guidelines

### Git Branches <!-- omit in toc -->

All changes must be made in a branch and submitted as PR.
We do not enforce any branch naming style, but please use something descriptive of your changes.

### Git Commits <!-- omit in toc -->

As minimal requirements, your commit message should:

- be capitalized
- not finish by a dot or any other punctuation character (!,?)
- start with a verb so that we can read your commit message this way: "This commit will ...", where "..." is the commit message.
  e.g.: "Fix the home page button" or "Add more tests for create_index method"

We don't follow any other convention, but if you want to use one, we recommend [this one](https://chris.beams.io/posts/git-commit/).

### GitHub Pull Requests <!-- omit in toc -->

Some notes on GitHub PRs:

- [Convert your PR as a draft](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/changing-the-stage-of-a-pull-request) if your changes are a work in progress: no one will review it until you pass your PR as ready for review.<br>
  The draft PR can be very useful if you want to show that you are working on something and make your work visible.
- The branch related to the PR must be **up-to-date with `main`** before merging. Fortunately, this project [integrates a bot](https://github.com/meilisearch/integration-guides/blob/main/guides/bors.md) to automatically enforce this requirement without the PR author having to do it manually.
- All PRs must be reviewed and approved by at least one maintainer.
- The PR title should be accurate and descriptive of the changes. The title of the PR will be indeed automatically added to the next [release changelogs](https://github.com/meilisearch/demo-movies/releases/).

<hr>

Thank you again for reading this through, we can not wait to begin to work with you if you made your way through this contributing guide ❤️

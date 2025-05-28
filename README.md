# SWRdata/Components

Experimental component library for SWR Data interactives.

[![Deploy Storybook](https://github.com/SWRdata/components/actions/workflows/deploy-storybook.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/deploy-storybook.yml) [![Run Storybook Tests](https://github.com/SWRdata/components/actions/workflows/test-storybook.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/test-storybook.yml) [![Release to NPM](https://github.com/SWRdata/components/actions/workflows/release.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/release.yml)

## Usage

[`swr-data-lab/components`](https://www.npmjs.com/package/@swr-data-lab/components) is a private npm package, so installing it takes some extra steps:

- Ensure you're a member of the `swr-data-lab` organisation on [npm](https://www.npmjs.com/)
- Log into npm and generate an [access token](https://docs.npmjs.com/about-access-tokens) of type `automation`
- For local development, add the token as an environment variable using the command line:
  - MacOS/Linux: `export NPM_TOKEN=[your-npm-token]` (test with `echo $NPM_TOKEN`)
  - Windows: `set NPM_TOKEN=[your-npm-token]` (test with `echo %NPM_TOKEN%`)
- For usage with Github Actions, add the token as a [repository secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions) called `NPM_TOKEN`
- Add the following `.npmrc` file to your project:

```
engine-strict=true
registry=https://registry.npmjs.org/
@swr-data-lab:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

- Run `npm install --save @swr-data-lab/components` to install the package
- Refer to [Storybook](https://static.datenhub.net/apps/components/main/index.html?path=/docs/about--docs) for component-level usage examples and documentation.

See also this [sample repository](https://github.com/SWRdata/components-usage-example).

## Project structure

There are three parts to this repository:

1. `/components`: Central repository for reusable components, utility scripts, and other reusable assets. We use [Storybook](https://storybook.js.org/) for previewing and component-level testing.
2. `/mock-sveltekit`: Sample [SvelteKit](https://kit.svelte.dev/) application used to test our components and develop the configuration needed to build our applications for SWR.de, the SWR Aktuell native app and wherever else they need to go.
3. `/mock-sophora`: Testing environment designed to mimic the SWR.de environment, featuring [`defunkt/jquery-pjax`](https://github.com/defunkt/jquery-pjax) navigation, global styles and server-side includes.

## Release Workflow

- We use [semantic-release](https://github.com/semantic-release/) to create releases and publish to the [NPM registry](https://www.npmjs.com/package/@swr-data-lab/components) on commit to `main`.
- Only [conventional commits](https://www.conventionalcommits.org/) trigger new releases. Prefix your commit message with `fix: ` for a patch, `feat: ` for a minor and `!: ` for a major version bump. See also [semantic-release docs](https://semantic-release.gitbook.io/semantic-release/support/faq).

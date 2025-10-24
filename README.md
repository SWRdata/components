# SWRdata/components

Component library for SWR Data Lab interactives.

[![Package version](https://img.shields.io/npm/v/%40swr-data-lab%2Fcomponents)](https://www.npmjs.com/package/@swr-data-lab/components) [![Deploy Storybook](https://github.com/SWRdata/components/actions/workflows/deploy-storybook.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/deploy-storybook.yml) [![Run Storybook Tests](https://github.com/SWRdata/components/actions/workflows/test-storybook.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/test-storybook.yml) [![Release to NPM](https://github.com/SWRdata/components/actions/workflows/release.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/release.yml)

## Usage

Run `npm install --save @swr-data-lab/components` to install the package

See also this [sample repository](https://github.com/SWRdata/components-usage-example). Refer to [Storybook](https://static.datenhub.net/apps/components/main/index.html?path=/docs/about--docs) for component-level usage examples and documentation.

## Contributing

### Project structure

1. `/components`: Central repository for reusable components, utility scripts, and other reusable assets. We use [Storybook](https://storybook.js.org/) for previewing and component-level testing.
2. `/mock-sveltekit`: Sample [SvelteKit](https://kit.svelte.dev/) application used to test our components and develop the configuration needed to build our applications for SWR.de, the SWR Aktuell native app and wherever else they need to go.
3. `/mock-sophora`: Testing environment designed to mimic the SWR.de environment, featuring [`defunkt/jquery-pjax`](https://github.com/defunkt/jquery-pjax) navigation, global styles and server-side includes.
4. `/sophora-components`: Experimental components that are intended to be used directly within SWR.de articles and pages via the "Datenjournalismus" module in the Sophora CMS.

### Release workflow

- We use [semantic-release](https://github.com/semantic-release/) to create releases and publish to the [NPM registry](https://www.npmjs.com/package/@swr-data-lab/components) on commit to `main`.
- Only [conventional commits](https://www.conventionalcommits.org/) trigger new releases. Prefix your commit message with `fix: ` for a patch, `feat: ` for a minor and `!: ` for a major version bump. See also [semantic-release docs](https://semantic-release.gitbook.io/semantic-release/support/faq).

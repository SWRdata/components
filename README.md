# Chart Components

Svelte/kit component library for [SWR Data Lab](https://www.swr.de/home/swr-data-lab-team-100.html) charts and interactives.

[![Package version](https://img.shields.io/npm/v/%40swr-data-lab%2Fcomponents)](https://www.npmjs.com/package/@swr-data-lab/components) [![deploy storybook](https://github.com/SWRdata/components/actions/workflows/deploy-storybook.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/deploy-storybook.yml) [![component tests](https://github.com/SWRdata/components/actions/workflows/test-storybook.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/test-storybook.yml) [![e2e tests](https://github.com/SWRdata/components/actions/workflows/e2e.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/e2e.yml) [![release](https://github.com/SWRdata/components/actions/workflows/release.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/release.yml)

## Usage

- Run `npm i --save @swr-data-lab/components` to install the package
- See [Storybook](https://static.datenhub.net/apps/components/main/index.html?path=/docs/about--docs) for component-level usage examples and documentation.

## Contributing

### Project structure

1. `/components`: Central repository for components, utility scripts, and other reusable assets. We use [Storybook](https://storybook.js.org/) for previewing and component testing.
2. `/mock-sveltekit`: Sample [SvelteKit](https://kit.svelte.dev/) application for e2e testing and developing the configuration needed to deploy our apps to SWR.de and the SWR Aktuell native app.
3. `/mock-sophora`: Testing environment designed to mimic the SWR.de environment, featuring [`defunkt/jquery-pjax`](https://github.com/defunkt/jquery-pjax) navigation, global styles and server-side includes.
4. `/sophora-components`: Experimental components that are intended to be used directly within SWR.de articles and pages via the "Datenjournalismus" module in the Sophora CMS.

### Release workflow

- We use [semantic-release](https://github.com/semantic-release/) to create releases and publish to [npm](https://www.npmjs.com/package/@swr-data-lab/components) on commit to `main`.
- Only [conventional commits](https://www.conventionalcommits.org/) trigger new releases. Prefix your commit message with `fix: ` for a patch, `feat: ` for a minor and `!: ` for a major version bump. See also [semantic-release docs](https://semantic-release.gitbook.io/semantic-release/support/faq).

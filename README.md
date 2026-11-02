# Chart Components

Svelte/kit component library for [SWR Data Lab](https://www.swr.de/home/swr-data-lab-team-100.html) charts and interactives.

[![Package version](https://img.shields.io/npm/v/%40swr-data-lab%2Fcomponents)](https://www.npmjs.com/package/@swr-data-lab/components) [![Map package version](https://img.shields.io/npm/v/%40swr-data-lab%2Fcomponents-map)](https://www.npmjs.com/package/@swr-data-lab/components-map) [![deploy storybook](https://github.com/SWRdata/components/actions/workflows/deploy-storybook.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/deploy-storybook.yml) [![component tests](https://github.com/SWRdata/components/actions/workflows/test-storybook.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/test-storybook.yml) [![e2e tests](https://github.com/SWRdata/components/actions/workflows/e2e.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/e2e.yml) [![release components](https://github.com/SWRdata/components/actions/workflows/release-components.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/release-components.yml) [![release components-map](https://github.com/SWRdata/components/actions/workflows/release-components-map.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/release-components-map.yml)

## Usage

- Run `npm i --save @swr-data-lab/components` to install the base component package
- Run `npm i --save @swr-data-lab/components-map` to install the maplibre component package
- See [Storybook](https://static.datenhub.net/apps/components/main/index.html?path=/docs/about--docs) for component-level usage examples and documentation.

## Contributing

### Project structure

1. `/components`: Publishable package `@swr-data-lab/components` with general components, utility scripts, and other reusable assets.
2. `/components-map`: Publishable package `@swr-data-lab/components-map` with the maplibre map components and basemap styles.
3. `/storybook`: Private [Storybook](https://storybook.js.org/) workspace for previewing and component testing. Stories stay colocated with their components in the two packages; this workspace only hosts the Storybook configuration and tooling. Run `npm run storybook --workspace=storybook` to start it.
4. `/mock-sveltekit`: Sample [SvelteKit](https://kit.svelte.dev/) application for e2e testing and developing the configuration needed to deploy our apps to SWR.de and the SWR Aktuell native app.
5. `/mock-sophora`: Testing environment designed to mimic the SWR.de environment, featuring [`defunkt/jquery-pjax`](https://github.com/defunkt/jquery-pjax) navigation, global styles and server-side includes.
6. `/sophora-components`: Experimental components that are intended to be used directly within SWR.de articles and pages via the "Datenjournalismus" module in the Sophora CMS.

### Release workflow

- We use [semantic-release](https://github.com/semantic-release/) to create releases and publish to [npm](https://www.npmjs.com/package/@swr-data-lab/components) on commit to `main`. Each publishable package is released independently with its own git tag prefix (`components-v*` and `components-map-v*`), triggered by changes under its directory.
- Only [conventional commits](https://www.conventionalcommits.org/) trigger new releases. Prefix your commit message with `fix: ` for a patch, `feat: ` for a minor and `!: ` for a major version bump. See also [semantic-release docs](https://semantic-release.gitbook.io/semantic-release/support/faq).

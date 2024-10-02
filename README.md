# SWRdata/Components

Experimental component library for SWR Data interactives.

[![Deploy Storybook](https://github.com/SWRdata/components/actions/workflows/deploy-storybook.yml/badge.svg)](https://github.com/SWRdata/components/actions/workflows/deploy-storybook.yml)

## Project structure

There are three parts to this repository:

1. `/components`: Central repository for reusable components, utility scripts, and other reusable assets. We use [Storybook](https://storybook.js.org/) for previewing and component testing.
2. `/mock-sveltekit`: Sample [SvelteKit](https://kit.svelte.dev/) application used to test our components and develop the configuration needed to build our applications for SWR.de, the SWR Aktuell native app and wherever else they need to go.
3. `/mock-sophora`: Testing environment designed to mimic the SWR.de environment, featuring [`defunkt/jquery-pjax`](https://github.com/defunkt/jquery-pjax) navigation, global styles and server-side includes.

## Proposed workflow

1. Run `npm run start` in the `/components` directory to launch Storybook, then work on any component
2. Run `npm run start` in the `mock-sveltekit` directory to launch the sample app, import your components and ensure they work as expected.
3. When you're done run `npm run build` to make a static build of the sample app
4. Run `npm run import` in the `mock-sophora/` directory to import the statically-built app into the `_includes` directory (this mimics a server-side include)
5. Run `npm run start` to start the mock Sophora environment and see if your app behaves as expected.

## Notes

-   Steps 2 - 5 in the proposed workflow above should (?) be automated
-   The **[pjax hydration bug](https://github.com/SWRdata/pjax-sveltekit/issues/3)** is solved in `mock-sveltekit` using a [server hook](https://github.com/SWRdata/components/blob/main/mock-sveltekit/src/hooks.server.js), as [suggested here](https://github.com/sveltejs/kit/issues/10411).
-   **Style encapsulation** between our news apps and the SWR.de website is implemented using SvelteKit's [Custom Elements API](https://svelte.dev/docs/custom-elements-api) following the pattern [developed here](https://github.com/SWRdata/pjax-sveltekit/issues/1). This doesn't support [declarative shadow DOM](https://web.dev/articles/declarative-shadow-dom), which means our apps will in effect be client-side rendered, but this...
    -   is an acceptable tradeoff
    -   may [change in Svelte 5](https://github.com/sveltejs/svelte/pull/10721)

## NPM Release Workflow

TODO

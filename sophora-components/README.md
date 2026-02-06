# Client-side components for Sophora

This is a collection of experimental client-side components for the Sophora CMS, meant to be used with the "Third Party / Drittplattform" content type.

Components are built using [SvelteKit](https://svelte.dev/docs/kit/introduction) and the [SWR Data Lab component library](https://static.datenhub.net/apps/components/main/index.html?path=/docs/about--docs).

The data displayed in the components can be configured via URL parameters.

## Usage example: Datawrapper Switcher

To display a switcher with multiple Datawrapper charts, you can use the following URL parameters:

- `ids` – Comma-separated list of Datawrapper chart IDs
- `labels` – Comma-separated list of labels to be used for the switcher
- `fixedHeight` (`Int`, optional) – Fixed height in pixels to be used for the container element
- `layout` (`row|column|auto`, optional) – Enforce a layout for the switcher. Defaults to `auto`, which will stack the labels vertically on small screens (`column`) and horizontally on larger screens (`row`)

### Example URL:

https://static.datenhub.net/apps/sophora-components/main/datawrapper-switcher.html?ids=oKR1L,bySDe,4r4Vi&labels=Super,E10,Diesel&layout=row

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

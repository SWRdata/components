# SWRdata/Components

Experimental component library for SWR Data interactives.

## Proposed Development Workflow

1. Work on a component in `/components`
2. Import that component into a SvelteKit app in `/mock-sveltekit` for testing. Run `npm run build` to make a static build of that site.
3. Import that statically-built site into a mock version of the Sophora CMS using `npm run import-sveltekit` for integration testing

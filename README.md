# SWRdata/Components

Experimental component library for SWR Data interactives.

## Proposed Development Workflow

1. Work on a component in `/components`
2. Import that component into a SvelteKit app in `/mock-sveltekit` for testing. Run `npm run build` to make a static build of that site.
3. Import that statically-built site into a mock version of the Sophora CMS using `npm run import-sveltekit` for integration testing

## Notes

- https://github.com/sveltejs/kit/issues/10411
- Big caveat: We can't use _declarative_ shadow DOM until probably Svelte 5

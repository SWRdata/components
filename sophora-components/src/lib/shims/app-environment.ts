// Shim for $app/environment used by @swr-data-lab/components
// Replaces SvelteKit's built-in module in this pure Vite setup
export const browser = typeof window !== 'undefined';
export const dev = import.meta.env.DEV;
export const building = false;
export const version = '';

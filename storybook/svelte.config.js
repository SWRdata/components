import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig} */
const config = {
	// We can't use vitePreprocess() here, see: https://github.com/sveltejs/kit/issues/13122
	preprocess: sveltePreprocess({ scss: true }),
	compilerOptions: {
		experimental: {
			async: true
		}
	}
};

export default config;

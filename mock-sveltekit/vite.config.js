import path from 'path';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter(),
			compilerOptions: {
				customElement: !process.argv.includes('dev'),
				experimental: {
					async: true
				}
			}
		})
	],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, '../components/src')
		}
	}
});

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [enhancedImages(), svelte()],
	resolve: {
		alias: [
			// Resolve the workspace packages to their sources so Storybook picks up
			// changes without a package build (and gets HMR).
			{
				find: /^@swr-data-lab\/components$/,
				replacement: path.resolve(dirname, '../components/src/index.js')
			},
			{
				find: /^@swr-data-lab\/components\/dist\/(.*)$/,
				replacement: path.resolve(dirname, '../components/src') + '/$1'
			},
			{
				find: /^@swr-data-lab\/components-map$/,
				replacement: path.resolve(dirname, '../components-map/src/index.js')
			},
			{
				find: /^@swr-data-lab\/components-map\/dist\/(.*)$/,
				replacement: path.resolve(dirname, '../components-map/src') + '/$1'
			}
		]
	}
});

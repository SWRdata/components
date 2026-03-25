import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		{
			name: 'resolve-app-environment',
			resolveId(id) {
				if (id === '$app/environment') {
					return resolve(__dirname, 'src/shims/app-environment.ts');
				}
			}
		},
		svelte()
	],
	resolve: {
		alias: {
			$lib: resolve(__dirname, 'src/lib')
		}
	},
	optimizeDeps: {
		exclude: ['@swr-data-lab/components']
	},
	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'index.html'),
				'datawrapper-switcher': resolve(__dirname, 'datawrapper-switcher.html'),
				'highlight-cards': resolve(__dirname, 'highlight-cards.html')
			}
		},
		outDir: 'build'
	}
});

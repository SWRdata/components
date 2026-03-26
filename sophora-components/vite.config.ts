import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig, loadEnv } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, __dirname, '');
	return {
	base: env.ASSETS_PATH || '/',
	plugins: [
		{
			name: 'resolve-custom-imports',
			enforce: 'pre',
			resolveId(id) {
				if (id === '$app/environment') {
					return resolve(__dirname, 'src/shims/app-environment.ts');
				}
				if (id.startsWith('@swr-data-lab/components/dist/')) {
					return resolve(__dirname, 'node_modules', id);
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
	};
});

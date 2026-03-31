import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig, loadEnv, type HtmlTagDescriptor } from 'vite';
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
						return resolve(__dirname, 'src/lib/shims/app-environment.ts');
					}
					if (id.startsWith('@swr-data-lab/components/dist/')) {
						return resolve(__dirname, 'node_modules', id);
					}
				}
			},
			{
				name: 'inject-to-body',
				enforce: 'post',
				transformIndexHtml: {
					order: 'post',
					handler(html) {
						// Vite injects <script>, <link rel="stylesheet"> and <link rel="modulepreload">
						// into <head> by default. We strip them and re-inject as tag descriptors
						// placed at the end of <body> using Vite's built-in HtmlTagDescriptor API.
						const tags: HtmlTagDescriptor[] = [];
						const cleaned = html
							.split('\n')
							.filter((line) => {
								const t = line.trim();
								if (t.startsWith('<script ')) {
									const src = t.match(/src="([^"]+)"/)?.[1];
									if (src) {
										tags.push({
											tag: 'script',
											attrs: { type: 'module', crossorigin: true, src },
											injectTo: 'body'
										});
									}
									return false;
								}
								if (t.startsWith('<link rel="stylesheet"')) {
									const href = t.match(/href="([^"]+)"/)?.[1];
									if (href) {
										tags.push({
											tag: 'link',
											attrs: { rel: 'stylesheet', crossorigin: true, href },
											injectTo: 'body'
										});
									}
									return false;
								}
								return true;
							})
							.join('\n');
						return { html: cleaned, tags };
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
			modulePreload: false,
			cssCodeSplit: true,
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

import path from 'path';
import dsv from '@rollup/plugin-dsv';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), dsv()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, '../../components/src'),
			'@data': path.resolve(__dirname, '../../data')
		}
	}
});

// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/svelte-vite';

const require = createRequire(import.meta.url);

function getAbsolutePath(value: string): any {
	if (process.platform.includes('win')) {
		return value;
	} else {
		return dirname(require.resolve(join(value, 'package.json')));
	}
}

const config: StorybookConfig = {
	stories: [
		'../../components/src/**/*.stories.@(js|ts|svelte)',
		'../../components/src/**/*.mdx',
		'../../components-map/src/**/*.stories.@(js|ts|svelte)',
		'../../components-map/src/**/*.mdx'
	],
	addons: [
		{
			name: getAbsolutePath('@storybook/addon-svelte-csf'),
			options: {
				legacyTemplate: true
			}
		},
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-vitest'),
		getAbsolutePath('@storybook/addon-docs'),
		getAbsolutePath('@vueless/storybook-dark-mode')
	],
	framework: {
		name: getAbsolutePath('@storybook/svelte-vite'),
		options: {}
	},

	docs: {}
};

export default config;

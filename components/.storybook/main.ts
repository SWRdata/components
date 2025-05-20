import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/sveltekit';

function getAbsolutePath(value: string): any {
	if (process.platform.includes('win')) {
		return value;
	} else {
		return dirname(require.resolve(join(value, 'package.json')));
	}
}

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|ts|svelte)', '../src/**/*.mdx'],
	addons: [
		{
			name: getAbsolutePath('@storybook/addon-svelte-csf'),
			options: {
				legacyTemplate: true
			}
		},
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@chromatic-com/storybook'),
		getAbsolutePath('@storybook/addon-vitest'),
		getAbsolutePath('@storybook/addon-docs')
	],
	framework: {
		name: getAbsolutePath('@storybook/sveltekit'),
		options: {}
	},

	docs: {}
};

export default config;

import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/sveltekit";

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|ts|svelte)",
    "../src/**/*.mdx",
  ],

  addons: [
    {
      name: '@storybook/addon-svelte-csf',
      options: {
        legacyTemplate: true
      }
    },
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-mdx-gfm")
  ],
  framework: {
    name: "@storybook/sveltekit",
    options: {},
  },

  docs: {}
};

export default config;
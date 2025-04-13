import type { Preview } from "@storybook/svelte";

const preview: Preview = {
  parameters: {
    options: {
      storySort: { order: ['About', 'Design Tokens', "Typography", "Display", "Chart", ["ChartHeader"], "Form", "Deprecated"] },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;

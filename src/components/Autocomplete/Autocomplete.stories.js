import { userEvent, within, expect } from "@storybook/test"
import AutoComplete from "."

export default {
  title: "Example/Autocomplete",
  tags: ["autodocs"],
  component: AutoComplete,
}

export const Ags = {
  args: {
    options: ["Hello", "World"],
    groupName: "two-options",
    value: "Hello",
  },
}

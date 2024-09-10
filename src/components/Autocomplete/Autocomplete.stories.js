import { userEvent, within, expect } from "@storybook/test"
import AutoComplete from "."

export default {
  title: "Example/Autocomplete",
  tags: ["autodocs"],
  component: AutoComplete,
}

const testData = ["Apples", "Oranges", "Pears", "Peaches", "Bananas"].map((el) => {
  return {
    value: el,
    label: el,
    details: {},
  }
})

export const Basic = {
  args: {
    data: testData,
    query: "apples",
    placeholder: "Select a fruit",
  },
}

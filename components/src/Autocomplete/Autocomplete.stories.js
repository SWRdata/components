import { userEvent, within, expect, fn } from "@storybook/test"
import AutoComplete from "./index.js"

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
    query: "",
    placeholder: "Select a fruit",
  },
}

export const Test = {
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    data: testData,
    query: "",
    placeholder: "Select a fruit",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByTestId("autocomplete-input")
    await step("Select using the mouse", async () => {
      await userEvent.click(input)
      expect(input).toHaveFocus()
      await userEvent.keyboard("ba")
      const bananasOption = canvas.getByText("Bananas")
      await userEvent.click(bananasOption)
      expect(input).toHaveValue("Bananas")
    })
    await userEvent.clear(input)
    await step("Select using the keyboard", async () => {
      await userEvent.click(input)
      expect(input).toHaveFocus()
      await userEvent.keyboard("ap")
      await userEvent.keyboard("{ArrowDown}")
      await userEvent.keyboard("{Enter}")
      expect(input).toHaveValue("Apples")
    })
    await userEvent.clear(input)
  },
}

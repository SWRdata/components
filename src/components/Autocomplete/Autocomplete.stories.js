import { userEvent, within, expect, fn } from "@storybook/test"
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

const onSelect = fn((e) => {
  return e.detail
})

export const Basic = {
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
    event_select: onSelect,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByTestId("autocomplete-input")
    await step("Select using the mouse", async () => {
      await userEvent.click(input)
      expect(input).toHaveFocus()
      await userEvent.keyboard("ba")
      const bananasOption = canvas.getByText("Bananas")
      await userEvent.click(bananasOption)
      expect(input).toHaveValue("Bananas")
      expect(onSelect).toHaveReturnedWith({ item: { label: "Bananas", value: "Bananas", lowerCasedValue: "bananas", details: {} } })
    })
    await userEvent.clear(input)
    await step("Select using the keyboard", async () => {
      await userEvent.click(input)
      expect(input).toHaveFocus()
      await userEvent.keyboard("ap")
      await userEvent.keyboard("{ArrowDown}")
      await userEvent.keyboard("{Enter}")
      expect(input).toHaveValue("Apples")
      expect(onSelect).toHaveReturnedWith({ item: { label: "Apples", value: "Apples", lowerCasedValue: "apples", details: {} } })
    })
    await userEvent.clear(input)
  },
}

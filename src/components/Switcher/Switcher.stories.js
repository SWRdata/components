import { userEvent, within, expect } from "@storybook/test"
import Switcher from "."

export default {
  title: "Example/Switcher",
  tags: ["autodocs"],
  component: Switcher,
}

export const TwoOptions = {
  args: {
    options: ["Option A", "Option B"],
    groupName: "two-options",
    value: "Option A",
  },
}

export const FourOptions = {
  args: {
    options: ["Apples", "Oranges", "Bananas", "Peaches"],
    groupName: "four-options",
    value: "Oranges",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step("Clicking selects the expected option", async () => {
      const optionA = canvas.getByLabelText("Apples")
      const optionB = canvas.getByLabelText("Bananas")
      await userEvent.click(optionA)
      expect(optionA).toBeChecked()
      expect(optionB).not.toBeChecked()
      await userEvent.click(optionB)
      expect(optionB).toBeChecked()
      expect(optionA).not.toBeChecked()
    })
  },
}

<script context="module">
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import Switcher from './Switcher.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
  import {
		userEvent,
		within,
		expect,
	} from '@storybook/test';

  const { Story } = defineMeta({
    title: 'Form/Switcher',
    parameters: {
			docs: {
				description: {
					component:
						'Radio-like form component to choose exactly one of a given set of options.'
				}
			}
		},
    argTypes: {
      label: {control: "text", description: "Visible label for the input"},
      value: {control: "text", description: "The currently selected option"},
      groupName: {control: "text", description: "Machine-readable name for the form field. Should be unique to other fields in the form."},
      size: {control: "inline-radio", options: ["default", "small"], defaultValue: {summary: "default"}},
      options: {control: "object", description: "The options available in the switcher."},
    }
  })

</script>


<Story name="Two Options">
	<DesignTokens>
    <Switcher
      options={["Option A", "Option B"]}
      groupName="two-options"
      value="Option A"
      size="default"
      label="Label"
    />
	</DesignTokens>
</Story>

<Story name="Four Options" play={async ({ canvasElement, step }) => {
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
  }}>
	<DesignTokens>
    <Switcher
    options={["Apples", "Oranges", "Bananas", "Peaches"]}
    groupName="four-options"
    value="Oranges"
    label="Label"
    size="small"
  />
	</DesignTokens>
</Story>

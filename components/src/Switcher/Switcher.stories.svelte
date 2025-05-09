<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Switcher from './Switcher.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
	import { userEvent, within, expect } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Form/Switcher',
		component: Switcher
	});
</script>

<Story name="Two Options" asChild>
	<DesignTokens>
		<Switcher options={['Option A', 'Option B']} value="Option A" size="default" label="Label" />
	</DesignTokens>
</Story>

<Story
	name="Four Options"
	asChild
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step('Clicking selects the expected option', async () => {
			const optionA = canvas.getByLabelText('Apples');
			const optionB = canvas.getByLabelText('Bananas');
			await userEvent.click(optionA);
			expect(optionA).toBeChecked();
			expect(optionB).not.toBeChecked();
			await userEvent.click(optionB);
			expect(optionB).toBeChecked();
			expect(optionA).not.toBeChecked();
		});
	}}
>
	<DesignTokens>
		<Switcher
			options={['Apples', 'Oranges', 'Bananas', 'Peaches']}
			value="Oranges"
			label="Label"
			size="small"
		/>
	</DesignTokens>
</Story>

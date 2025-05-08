<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { userEvent, within, expect } from 'storybook/test';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	import Autocomplete from './Autocomplete.svelte';

	const { Story } = defineMeta({
		title: 'Deprecated/Autocomplete'
	});

	const testData = ['Apples', 'Oranges', 'Pears', 'Peaches', 'Bananas'].map((el) => {
		return {
			value: el,
			label: el,
			details: {}
		};
	});
</script>

<Story
	name="Basic"
	tags={['autodocs']}
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByTestId('autocomplete-input');
		await step('Select using the mouse', async () => {
			await userEvent.click(input);
			expect(input).toHaveFocus();
			await userEvent.keyboard('ba');
			const bananasOption = canvas.getByText('Bananas');
			await userEvent.click(bananasOption);
			expect(input).toHaveValue('Bananas');
		});
		await userEvent.clear(input);
		await step('Select using the keyboard', async () => {
			await userEvent.click(input);
			expect(input).toHaveFocus();
			await userEvent.keyboard('ap');
			await userEvent.keyboard('{ArrowDown}');
			await userEvent.keyboard('{Enter}');
			expect(input).toHaveValue('Apples');
		});
		await userEvent.clear(input);
	}}
>
	<DesignTokens>
		<div class="container">
			<Autocomplete label="" name="test" data={testData} query="" placeholder="Select a fruit"
			></Autocomplete>
		</div>
	</DesignTokens>
</Story>

<style>
	.container {
		background: var(--violet-dark-5);
		padding: 5%;
	}
</style>

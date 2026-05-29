<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Switcher from './Switcher.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
	import { userEvent, within, expect, fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Form/Switcher',
		component: Switcher,
		parameters: {
			layout: 'fullscreen'
		}
	});

	const onChangeSpy = fn();
</script>

<Story name="Two Options" asChild>
	<DesignTokens theme="auto">
		<div class="container">
			<Switcher options={['Option A', 'Option B']} value="Option A" size="default" label="Label" />
		</div>
	</DesignTokens>
</Story>

<Story name="Hidden Label" asChild>
	<DesignTokens theme="auto">
		<Switcher
			hideLabel
			options={['Option A', 'Option B']}
			value="Option A"
			size="default"
			label="Label"
		/>
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
	<DesignTokens theme="auto">
		<div class="container">
			<Switcher
				options={['Apples', 'Oranges', 'Bananas', 'Peaches']}
				value="Oranges"
				label="Label"
				size="small"
			/>
		</div>
	</DesignTokens>
</Story>

<Story
	name="Force row layout"
	asChild
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step('Options are displayed in a row', async () => {
			const list = canvas.getByRole('list');
			expect(list.classList).toContain('layout-row');
		});
	}}
>
	<DesignTokens theme="auto">
		<Switcher
			options={['Do not wrap', 'on mobile']}
			value="Do not wrap"
			label="Label"
			layout="row"
		/>
	</DesignTokens>
</Story>

<Story
	name="Force column layout"
	asChild
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step('Options are displayed in a row', async () => {
			const list = canvas.getByRole('list');
			expect(list.classList).toContain('layout-column');
		});
	}}
>
	<DesignTokens theme="auto">
		<Switcher
			options={['Always wrap', 'even on', 'large screens']}
			value="Always wrap"
			label="Label"
			layout="column"
		/>
	</DesignTokens>
</Story>
<Story
	name="onchange event"
	asChild
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step('onchange handler is called', async () => {
			const optionA = canvas.getByLabelText('Option A');
			const optionB = canvas.getByLabelText('Option B');
			await userEvent.click(optionB);
			expect(onChangeSpy).toHaveBeenCalledTimes(1);
			await userEvent.click(optionA);
			expect(onChangeSpy).toHaveBeenCalledTimes(2);
		});
	}}
>
	<DesignTokens>
		<Switcher
			options={['Option A', 'Option B']}
			value="Option A"
			size="default"
			label="Label"
			onchange={onChangeSpy}
		/>
	</DesignTokens>
</Story>

<style>
	.container {
		background: var(--color-pageFill);
		padding: 5%;
		min-height: 500px;
	}
</style>

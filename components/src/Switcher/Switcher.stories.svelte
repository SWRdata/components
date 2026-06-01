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
	const dwIds = ['GjkbO', 'R5jey'];
	let selectedDw = $state(dwIds[0]);
</script>

<Story name="Two Options" asChild>
	<DesignTokens theme="auto">
		<div class="container">
			<Switcher options={['Option A', 'Option B']} value="Option A" size="default" label="Label" />
		</div>
	</DesignTokens>
</Story>

<Story name="Two Options, Centered Label" asChild>
	<DesignTokens theme="auto">
		<div class="container">
			<Switcher
				align="center"
				options={['Option A', 'Option B']}
				value="Option A"
				size="default"
				label="Label"
			/>
		</div>
	</DesignTokens>
</Story>

<Story name="Hidden Label" asChild>
	<DesignTokens theme="auto">
		<div class="container">
			<Switcher
				hideLabel
				options={['Option A', 'Option B']}
				value="Option A"
				size="default"
				label="Label"
			/>
		</div>
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
		<div class="container">
			<Switcher
				options={['This switcher', 'will not wrap', 'on mobile']}
				value="This switcher"
				label="Label"
				layout="row"
			/>
		</div>
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
		<div class="container">
			<Switcher
				options={['Always wrap', 'even on', 'large screens']}
				value="Always wrap"
				label="Label"
				layout="column"
			/>
		</div>
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
		<div class="container">
			<Switcher
				options={['Option A', 'Option B']}
				value="Option A"
				size="default"
				label="Label"
				onchange={onChangeSpy}
			/>
		</div>
	</DesignTokens>
</Story>

<Story name="Datawrapper Switcher" asChild>
	<DesignTokens theme="auto">
		<div class="container">
			<div class="datawrapper-switcher">
				<Switcher
					align="center"
					options={dwIds}
					size="small"
					label="Land auswählen"
					bind:value={selectedDw}
				/>
				{#each dwIds as id}
					<div class="datawrapper-chart" class:active={id === selectedDw} style:height="600px">
						<img src={`https://datawrapper.dwcdn.net/${id}/full.png`} />
					</div>
				{/each}
			</div>
		</div>
	</DesignTokens>
</Story>

<style>
	.container {
		background: var(--color-pageFill);
		padding: 5%;
	}

	.datawrapper-switcher {
		display: flex;
		align-items: center;
		flex-flow: column;
		gap: 1rem;
		img {
			display: block;
			width: 40rem;
		}
	}

	.datawrapper-chart {
		display: none;
	}
	.active {
		display: block;
	}
</style>

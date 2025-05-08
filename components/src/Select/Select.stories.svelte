<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Select from './Select.svelte';
	import StoryTemplate from './SelectStoriesTemplate.svelte';
	import jobsData from './mock_data/jobs.json';

	const { Story } = defineMeta({
		title: 'Form/Select'
	});
</script>

<script lang="ts">
	import { userEvent, within, expect } from 'storybook/test';
	import { type SelectItem } from './Select.types';
	let selectedItem: SelectItem | undefined = undefined;
</script>

<Story
	name="Simple"
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const select = canvas.getByLabelText('Select');

		await step('Clicking an option selects that item', async () => {
			await userEvent.click(select);
			await userEvent.click(canvas.getByText('Cake'));
			expect(selectedItem).toEqual({ value: 'cake', label: 'Cake' });
		});

		await step('Entering a complete label selects that item', async () => {
			await userEvent.type(select, 'Chocolate{enter}');
			expect(selectedItem).toEqual({ value: 'chocolate', label: 'Chocolate' });
		});

		await step('Entering a unique part of a label selects the matching item', async () => {
			await userEvent.type(select, 'Ice{enter}');
			expect(selectedItem).toEqual({ value: 'ice-cream', label: 'Ice Cream' });
		});

		await step('Tapping the clear button clears the input', async () => {
			const clearButton = document.querySelector('.clear-select');
			await userEvent.click(clearButton);
			expect(selectedItem).toEqual(undefined);
		});
	}}
>
	<StoryTemplate
		bind:selectedItem
		args={{
			inputId: 'select',
			clearable: true,
			items: [
				{ value: 'chocolate', label: 'Chocolate' },
				{ value: 'cake', label: 'Cake' },
				{ value: 'ice-cream', label: 'Ice Cream' }
			]
		}}
	/>
</Story>

<Story name="Grouped">
	<StoryTemplate
		bind:selectedItem
		args={{
			items: [
				{ value: 'chocolate', label: 'Chocolate', group: 'Sweet' },
				{ value: 'pizza', label: 'Pizza', group: 'Savory' },
				{ value: 'cake', label: 'Cake', group: 'Sweet' },
				{ value: 'chips', label: 'Chips', group: 'Savory' },
				{ value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' }
			]
		}}
	/>
</Story>

<Story
	name="Grouped (group header selectable)"
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const select = canvas.getByLabelText('Select');

		await step('Clicking an option header selects that header item', async () => {
			await userEvent.click(select);
			await userEvent.click(canvas.getByText('Savory'));
			expect(selectedItem).toEqual({
				groupHeader: true,
				id: 'Savory',
				label: 'Savory',
				selectable: true,
				value: 'Savory'
			});
		});

		await step('Entering a label text selects its group header', async () => {
			await userEvent.type(select, 'Chocolate{enter}');
			expect(selectedItem).toEqual({
				groupHeader: true,
				id: 'Sweet',
				label: 'Sweet',
				selectable: true,
				value: 'Sweet'
			});
		});
	}}
>
	<StoryTemplate
		bind:selectedItem
		args={{
			inputId: 'job-select',
			placeholder: 'Ihr Beruf',
			groupHeaderSelectable: true,
			items: [
				{ value: 'chocolate', label: 'Chocolate', group: 'Sweet' },
				{ value: 'pizza', label: 'Pizza', group: 'Savory' },
				{ value: 'cake', label: 'Cake', group: 'Sweet' },
				{ value: 'chips', label: 'Chips', group: 'Savory' },
				{ value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' }
			]
		}}
	/>
</Story>

<Story
	name="Custom items"
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const select = canvas.getByLabelText('Berufe');

		await step('Render custom list item with the supplied data', async () => {
			await userEvent.type(select, 'Journalismus');
			expect(canvas.getByTestId('custom-item-title').innerText).toEqual('Journalismus');
			expect(canvas.getByTestId('custom-item-addon').innerText).toContain('Redakteur/in');
			await userEvent.type(select, '{enter}');
			expect(selectedItem.details.title).toEqual('Journalismus');
		});

		await step('Entering an item\'s "title" selects that item', async () => {
			await userEvent.type(select, 'Tierpflege{enter}');
			expect(selectedItem.details.title).toEqual('Tierpflege');
		});

		await step('Entering an item\'s "addon" selects that item', async () => {
			await userEvent.type(select, 'Zirkuskünstler{enter}');
			expect(selectedItem.details.title).toEqual('Schauspiel und Tanz');
		});
	}}
>
	<StoryTemplate>
		{#snippet demoComponent()}
			<label for="job-select">Berufe</label>
			<Select
				bind:value={selectedItem}
				inputId="job-select"
				placeholder="z.B. Taxifahrer/in"
				items={jobsData
					.sort((a, b) => a.label.localeCompare(b.label))
					.map((item) => ({
						value: item.value,
						label: `${item.label}: ${item.add_on}`, // used for filtering
						details: {
							title: item.label, // used for display
							addon: item.add_on // used for display
						}
					}))}
				groupHeaderSelectable={false}
			>
				<div slot="item" let:item class="custom-item">
					<h4 class="custom-item-title" data-testid="custom-item-title">
						{item.details.title}
					</h4>
					<p class="custom-item-addon" data-testid="custom-item-addon">{item.details.addon}</p>
				</div>
				<div slot="selection" let:selection class="selection">
					{selection.details.title}
				</div>
			</Select>
		{/snippet}
	</StoryTemplate>
</Story>

<style>
	.custom-item {
		font-size: 0.9rem;
		margin-top: 0.2rem;
	}

	.custom-item-title {
		margin: 0 0 0 -0.8rem;
		padding: 0;
		line-height: 1.4;
	}

	.custom-item-addon {
		margin: 0 0 0 -0.8rem;
		padding: 0;
		line-height: 1;
		opacity: 0.6;
		font-size: 0.8rem;
	}
</style>

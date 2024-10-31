<script context="module">
	import Select from './Select.svelte';
	import groupedJobs from '../assets/mock_data/jobs_grouped.json';
	import groupedThreeDigits from '../assets/mock_data/jobs_3.json';
	import groupedFourDigits from '../assets/mock_data/jobs_4.json';
	import jobsData from '../assets/mock_data/jobs_addons.json';

	export const meta = {
		title: 'Input Components/Svelte Select',
		component: Select,
		// FIXME: remove this manual documentation when autodocs are fixed
		// TODO: finish documentation
		parameters: {
			docs: {
				description: {
					component:
						'This component is a select input with search feature and various options such as grouped items, multi-select etc. based on https://github.com/rob-balfre/svelte-select'
				}
			}
		},
		argTypes: {
			inputId: {
				description: "The input field's ID",
				control: 'text',
				type: { name: 'string', required: false },
				defaultValue: 'select'
			},
			placeholder: {
				description: "The input field's placeholder text",
				control: 'text',
				type: { name: 'string', required: false },
				defaultValue: 'Bitte auswählen'
			}
			// items (interface)
			// groupHeaderSelectable
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';

	let selectedItem;
</script>

<Template let:args>
	<label for={args.inputId}>Label</label>

	<Select {...args} bind:value={selectedItem} />

	{#if selectedItem}
		<code class="output">
			{JSON.stringify(selectedItem)}
		</code>
	{/if}
</Template>

<Story
	name="Simple"
	args={{
		items: [
			{ value: 'chocolate', label: 'Chocolate' },
			{ value: 'cake', label: 'Cake' },
			{ value: 'ice-cream', label: 'Ice Cream' }
		]
	}}
/>

<Story
	name="Grouped"
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

<Story
	name="Jobs (3 digits)"
	args={{
		inputId: 'job-select',
		placeholder: 'Ihr Beruf',
		items: groupedThreeDigits
	}}
/>

<Story
	name="Jobs (3 digits)"
	args={{
		inputId: 'job-select',
		placeholder: 'Ihr Beruf',
		items: groupedThreeDigits
	}}
/>

<Story
	name="Jobs (4 digits)"
	args={{
		inputId: 'job-select',
		placeholder: 'Ihr Beruf',
		items: groupedFourDigits
	}}
/>

<Story
	name="Jobs (grouped)"
	args={{
		inputId: 'job-select',
		placeholder: 'Ihr Beruf',
		items: groupedJobs,
		groupHeaderSelectable: false
	}}
/>

<Story
	name="Jobs (grouped, group header selectable)"
	args={{
		inputId: 'job-select',
		placeholder: 'Ihr Beruf',
		items: groupedJobs,
		groupHeaderSelectable: true
	}}
/>

<Story name="Custom items">
	<label for="job-select">Label</label>

	<Select
		bind:value={selectedItem}
		inputId="job-select"
		placeholder="Berufe"
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
			<h4 class="custom-item-title">{item.details.title}</h4>
			<p class="custom-item-addon">{item.details.addon}</p>
		</div>
		<div slot="selection" let:selection class="selection">
			{selection.details.title}
		</div>
	</Select>

	{#if selectedItem}
		<code class="output">
			{JSON.stringify(selectedItem)}
		</code>
	{/if}
</Story>

<style>
	.output {
		display: block;
		margin-top: 1rem;
		padding: 1rem;
		background: #dadada;
	}

	.custom-item {
		font-family: sans-serif;
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

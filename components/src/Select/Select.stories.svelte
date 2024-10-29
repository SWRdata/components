<script context="module">
	import Select from './Select.svelte';
	import groupedJobs from '../assets/mock_data/jobs_grouped.json';
	import groupedThreeDigits from '../assets/mock_data/jobs_3.json';
	import groupedFourDigits from '../assets/mock_data/jobs_4.json';

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
	<Select {...args} bind:selectedItem />

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

<style>
	.output {
		display: block;
		margin-top: 1rem;
		padding: 1rem;
		background: #dadada;
	}
</style>

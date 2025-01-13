<script context="module">
	import Card from './Card.svelte';

	export const meta = {
		title: 'Input Components/Card',
		component: Card
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import {
		userEvent,
		within,
		expect,
		getByTestId,
		getAllByLabelText,
		getByText
	} from '@storybook/test';
	import { hasContext } from 'svelte';
	import Input from '../Input/Input.svelte';

	let component;
</script>

<Story name="Basic card">
	<Card>
		<h1>Any content</h1>
		<p>can be added to a basic <code>Card</code> component.</p>
	</Card>
</Story>

<Template let:args>
	<Card {...args} bind:this={component}><slot /></Card>
</Template>

<Story
	name="Simple"
	args={{
		inputId: 'select',
		clearable: true
	}}
/>

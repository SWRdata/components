<script context="module">
	import Card from './Card.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

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
	<DesignTokens>
		<Card>
			<h1>Any content</h1>
			<p>can be added to a basic <code>Card</code> component.</p>
		</Card>
	</DesignTokens>
</Story>

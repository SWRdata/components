<script context="module">
	import Card from './Card.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	export const meta = {
		title: 'Display/Card',
		component: Card
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Story name="Basic card">
	<DesignTokens>
		<Card>
			<h1>Any content</h1>
			<p>can be added to a basic <code>Card</code> component.</p>
		</Card>
	</DesignTokens>
</Story>

<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from './Card.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	const { Story } = defineMeta({
		title: 'Display/Card/Base',
		component: Card
	});
</script>

<Story name="Basic card" asChild>
	<DesignTokens>
		<Card>
			<h1>Any content</h1>
			<p>can be added to a basic <code>Card</code> component.</p>
		</Card>
	</DesignTokens>
</Story>

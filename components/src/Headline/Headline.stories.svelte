<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	import Headline from './Headline.svelte';

	const { Story } = defineMeta({
		title: 'Typography/Headline',
		component: Headline
	});
</script>

<Story name="Default" asChild>
	<DesignTokens>
		<div class="container">
			<Headline>Baden-Württemberg heizt überdurchschnittlich viel mit Wärmepumpe</Headline>
		</div>
	</DesignTokens>
</Story>

<style>
	.container {
		color: var(--color-textPrimary);
	}
</style>

<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Map from './Map.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	const { Story } = defineMeta({
		title: 'Map/Map',
		component: Map
	});
</script>

<Story name="Basic" asChild>
	<DesignTokens></DesignTokens>
</Story>

<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Map from '../Map/Map.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	const { Story } = defineMeta({
		title: 'Map/MapStyle',
		component: Map
	});
</script>

<Story asChild name="Basic">
	<DesignTokens>
		<div class="grid">
			<div class="container"><Map /></div>
			<div class="container"><Map /></div>
			<div class="container"><Map /></div>
			<div class="container"><Map /></div>
		</div>
	</DesignTokens>
</Story>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto;
		border: 1px solid red;
		height: 90vh;
	}
	.container {
		border: 1px solid red;
		overflow: hidden;
	}
</style>

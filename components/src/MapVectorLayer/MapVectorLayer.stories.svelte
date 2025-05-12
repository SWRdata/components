<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapVectorLayer from './MapVectorLayer.svelte';

	const { Story } = defineMeta({
		title: 'Map/MapVectorLayer',
		component: MapVectorLayer
	});
</script>

<Story name="Basic"></Story>

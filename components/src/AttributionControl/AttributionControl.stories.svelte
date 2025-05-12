<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AttributionControl from './AttributionControl.svelte';

	const { Story } = defineMeta({
		title: 'Map/Control/AttributionControl',
		component: AttributionControl
	});
</script>

<Story name="Basic"></Story>

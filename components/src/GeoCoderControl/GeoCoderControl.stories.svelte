<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import GeoCoderControl from './GeoCoderControl.svelte';

	const { Story } = defineMeta({
		title: 'Map/Control/GeoCoderControl',
		component: GeoCoderControl
	});
</script>

<Story name="Basic"></Story>

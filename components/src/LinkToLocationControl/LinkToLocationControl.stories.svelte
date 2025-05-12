<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LinkToLocationControl from './LinkToLocationControl.svelte';

	const { Story } = defineMeta({
		title: 'Map/Control/LinkToLocationControl',
		component: LinkToLocationControl
	});
</script>

<Story name="Basic"></Story>

<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import isDarkMode from './isDarkMode.svelte.js';

	const { Story } = defineMeta({
		title: 'Meta/isDarkMode'
	});
</script>

<Story name="Basic" asChild>{JSON.stringify(isDarkMode())}</Story>

<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Logotype from './Logotype.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	const { Story } = defineMeta({
		title: 'Chart/Logotype',
		component: Logotype
	});
</script>

<Story name="Basic" asChild>
	<DesignTokens>
		<Logotype></Logotype>
	</DesignTokens>
</Story>

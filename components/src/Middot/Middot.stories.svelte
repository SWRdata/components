<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Middot from './Middot.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	const { Story } = defineMeta({
		title: 'Chart/Middot',
		component: Middot
	});
</script>

<Story name="Basic" asChild>
	<DesignTokens>
		<Middot></Middot>
	</DesignTokens>
</Story>

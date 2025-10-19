<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	import Copy from './Breakout.svelte';

	const { Story } = defineMeta({
		title: 'Display/Breakout',
		component: Copy
	});
</script>

<Story name="Default" asChild>
	<DesignTokens></DesignTokens>
</Story>

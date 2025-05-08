<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	import Headline from './Headline.svelte';

	const { Story } = defineMeta({
		title: 'Typography/Headline'
	});
</script>

<Story name="Default">
	<DesignTokens>
		<Headline>Baden-Württemberg heizt überdurchschnittlich viel mit Wärmepumpe</Headline>
	</DesignTokens>
</Story>

<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	import Caption from './Caption.svelte';

	const { Story } = defineMeta({
		title: 'Typography/Caption',
		component: Caption
	});
</script>

<Story name="Default" asChild>
	<DesignTokens>
		<Caption>Björn Schittenhelm, Apotheker aus Holzgerlingen (Kreis Böblingen)</Caption>
	</DesignTokens>
</Story>
<Story name="Bold" asChild>
	<DesignTokens>
		<Caption weight="bold">
			Björn Schittenhelm, Apotheker aus Holzgerlingen (Kreis Böblingen)
		</Caption>
	</DesignTokens>
</Story>

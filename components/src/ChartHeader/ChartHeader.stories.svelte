<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	import ChartHeader from './ChartHeader.svelte';

	const { Story } = defineMeta({
		title: 'Chart/ChartHeader',
		component: ChartHeader
	});
</script>

<Story name="Default">
	<DesignTokens>
		<ChartHeader
			title="Mehr über-60-Jährige in allen Berufen"
			subtitle="Veränderung des Anteils der Beschäftigen über 60 Jahren in allen Berufsgruppen seit 2013 (Bundesweit)"
		>
			{#snippet content()}
				Arbitrary HTML content can go here
			{/snippet}
		</ChartHeader>
	</DesignTokens>
</Story>

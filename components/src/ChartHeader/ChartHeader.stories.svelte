<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
	import { expect } from '@storybook/test';

	import ChartHeader from './ChartHeader.svelte';

	const { Story } = defineMeta({
		title: 'Chart/ChartHeader',
		component: ChartHeader
	});
</script>

<Story
	name="Default"
	play={async ({ canvasElement, step }) => {
		await step('Container has ID attribute derived from title prop', async () => {
			const containerEl = document.querySelector('#mehr-uber-60-jahrige-in-allen-berufen');
			expect(containerEl).toBeTruthy();
		});
	}}
>
	<DesignTokens>
		<ChartHeader
			title="Mehr über-60-Jährige in allen Berufen"
			subtitle="Veränderung des Anteils der Beschäftigen über 60 Jahren in allen Berufsgruppen seit 2013 (Bundesweit)"
		>
			Arbitrary HTML content can go here
		</ChartHeader>
	</DesignTokens>
</Story>

<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { within, expect } from 'storybook/test';

	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	import ChartList from './ChartList.svelte';

	const { Story } = defineMeta({
		title: 'Meta/ChartList',
		component: ChartList,
		parameters: {
			layout: 'fullscreen'
		}
	});

const baseURL = 'https://static.datenhub.net/apps/p110_wald-klimawandel/main';

const testCharts = [
	{ title: 'Baden-Württemberg Loosers', url: `${baseURL}/bw-loosers.html` },
	{ title: 'Baden-Württemberg Winners', url: `${baseURL}/bw-winners.html` },
	{ title: 'Rheinland-Pfalz Loosers', url: `${baseURL}/rp-loosers.html` },
	{ title: 'Rheinland-Pfalz Winners', url: `${baseURL}/rp-winners.html` }
];
</script>

<Story
	name="Custom base path"
	asChild
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Project title renders', async () => {
			const titleEl = canvas.getByTestId('chartlist-project-title');
			expect(titleEl).toHaveTextContent('Grafiken für p110: Wie sieht der Wald von morgen aus?');
		});

		await step('Embed URLs render', async () => {
			testCharts.forEach((c) => {
				const el = canvas.getByDisplayValue(c.url);
				expect(el).toBeTruthy();
			});
		});
	}}
>
	<DesignTokens>
		<ChartList charts={testCharts} project="p110: Wie sieht der Wald von morgen aus?" />
	</DesignTokens>
</Story>

<Story name="Grouped charts" asChild>
	<DesignTokens>
		<ChartList charts={[
			{ group: 'BW', title: 'Baden-Württemberg Loosers', url: `${baseURL}/bw-loosers.html` },
			{ group: 'BW', title: 'Baden-Württemberg Winners', url: `${baseURL}/bw-winners.html` },
			{ group: 'RP', title: 'Rheinland-Pfalz Loosers', url: `${baseURL}/rp-loosers.html` },
			{ title: 'Rheinland-Pfalz Winners', url: `${baseURL}/rp-winners.html` }
		]} project="p110: Wie sieht der Wald von morgen aus?" />
	</DesignTokens>
</Story>

<Story name="Charts with explicit URLs" asChild>
	<DesignTokens>
		<ChartList
			charts={[
				{ ...testCharts[0], url: `${baseURL}/bw-loosers-custom.html` }
			]}
			project="p110: Wie sieht der Wald von morgen aus?"
		/>
	</DesignTokens>
</Story>
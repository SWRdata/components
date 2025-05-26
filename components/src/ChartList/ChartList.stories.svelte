<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { within, expect } from 'storybook/test';

	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	import ChartList from './ChartList.svelte';

	const { Story } = defineMeta({
		title: 'Meta/ChartList',
		component: ChartList
	});

	const testCharts = [
		{ title: 'Baden-Württemberg Loosers', slug: 'bw-loosers' },
		{ title: 'Baden-Württemberg Winners', slug: 'bw-winners' },
		{ title: 'Rheinland-Pfalz Loosers', slug: 'rp-loosers' },
		{ title: 'Rheinland-Pfalz Winners', slug: 'rp-winners' }
	];
</script>

<Story
	name="Default"
	asChild
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Project title renders', async () => {
			const titleEl = canvas.getByTestId('chartlist-project-title');
			expect(titleEl).toHaveTextContent('Grafiken für p110: Wie sieht der Wald von morgen aus?');
		});

		await step('All chart list items render', async () => {
			testCharts.forEach((c) => {
				const el = canvas.getByText(c.title);
				expect(el).toBeTruthy();
			});
		});
	}}
>
	<DesignTokens>
		<ChartList
			baseUrl="https://static.datenhub.net/apps/p110_wald-klimawandel/main"
			charts={testCharts}
			project="p110: Wie sieht der Wald von morgen aus?"
		/>
	</DesignTokens>
</Story>

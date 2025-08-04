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
	name="Custom base path"
	asChild
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Project title renders', async () => {
			const titleEl = canvas.getByTestId('chartlist-project-title');
			expect(titleEl).toHaveTextContent('Grafiken für p110: Wie sieht der Wald von morgen aus?');
		});

		await step('All chart list items render as links using project-relative URLs', async () => {
			testCharts.forEach((c) => {
				const el = canvas.getByText(c.title);
				expect(el).toBeInstanceOf(HTMLAnchorElement);
				expect(el.getAttribute('href')).toBe(resolve('/' + c.slug));
			});
		});

		await step('Embed URLs render', async () => {
			testCharts.forEach((c) => {
				const el = canvas.getByDisplayValue(
					`https://static.datenhub.net/apps/p110_wald-klimawandel/main/${c.slug}.html`
				);
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

<Story
	name="Default base path (omitting basePath)"
	asChild
	play={async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('All chart list items render as links using project-relative URLs', async () => {
			testCharts.forEach((c) => {
				const el = canvas.getByText(c.title);
				expect(el).toBeInstanceOf(HTMLAnchorElement);
				expect(el.getAttribute('href')).toBe(`/${c.slug}`);
			});
		});

		await step('Embed paths render with .html prefix', async () => {
			testCharts.forEach((c) => {
				const el = canvas.getByDisplayValue(`/${c.slug}.html`);
				expect(el).toBeTruthy();
			});
		});
	}}
>
	<DesignTokens>
		<ChartList charts={testCharts} project="p110: Wie sieht der Wald von morgen aus?" />
	</DesignTokens>
</Story>

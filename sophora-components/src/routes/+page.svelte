<script>
	import { ChartList, DesignTokens } from '@swr-data-lab/components';
	const charts = [
		{ title: 'Highlight Cards', slug: 'highlight-cards' },
		{
			title: 'Datawrapper Switcher',
			slug: 'datawrapper-switcher?ids=oKR1L,bySDe,4r4Vi&labels=Super,E10,Diesel&fixedHeight=450&activeColor=%2305556a'
		}
	];
</script>

<DesignTokens>
	<ChartList
		baseUrl="https://static.datenhub.net/apps/sophora-components/main"
		project="Client-side components for Sophora"
		{charts}
	/>
</DesignTokens>

<script>
	import { ChartList, DesignTokens } from '@swr-data-lab/components';

	const charts = [{ title: 'Repro', slug: 'map-test' }];
</script>

<DesignTokens>
	<ChartList
		baseUrl="https://static.datenhub.net/apps/p139_klimaziele_verkehr/main"
		project="p348: Repro"
		{charts}
	/>
</DesignTokens>

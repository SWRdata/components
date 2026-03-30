<script>
	// Example parameters for the charts, can be used in development to prefill the charts with data
	// TODO: Find a better way to manage example parameters, e.g. using Storybook or a list of example URLs
	const EXAMPLE_PARAMS = {
		HIGHLIGHT_CARDS:
			'?data=%5B%0A%20%20%7B%0A%20%20%20%20%22topline%22%3A%20%22Im%20Jahr%202026%20wurden%20bisher%22%2C%0A%20%20%20%20%22value%22%3A%20%220%22%2C%0A%20%20%20%20%22unit%22%3A%20%22%E2%82%AC%22%2C%0A%20%20%20%20%22subline%22%3A%20%22an%20Parteien%20gespendet%22%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20%22topline%22%3A%20%22Am%2023.%20Dezember%20gingen%22%2C%0A%20%20%20%20%22value%22%3A%20%22136.000%22%2C%0A%20%20%20%20%22unit%22%3A%20%22%E2%82%AC%22%2C%0A%20%20%20%20%22subline%22%3A%20%22an%20die%20Partei%20CSU.%20Absender%20war%20Verband%20der%20Bayrischen%20Metall-%20und%20Elektro-Industrie%22%0A%20%20%7D%0A%5D',
		DATAWRAPPER_SWITCHER:
			'?ids=oKR1L,bySDe,4r4Vi&labels=Super,E10,Diesel&fixedHeight=450&layout=row'
	};

	const charts = [
		{
			title: 'Highlight Cards',
			slug: `highlight-cards${EXAMPLE_PARAMS.HIGHLIGHT_CARDS}`
		},
		{
			title: 'Datawrapper Switcher',
			slug: `datawrapper-switcher${EXAMPLE_PARAMS.DATAWRAPPER_SWITCHER}`
		}
	];
</script>

<h1>Demo Embeds</h1>
{#each charts as chart}
	<div class="chart-link">
		<a href={`./${chart.slug}`}>
			{chart.title}
		</a>
	</div>
{/each}

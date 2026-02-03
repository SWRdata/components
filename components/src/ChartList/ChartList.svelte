<script lang="ts">
	import { dev } from '$app/environment';
	import Row from './Row.svelte';

	type ProjectPrefix = 'p' | 't';
	type ProjectIdentifier = `${ProjectPrefix}${number}: ${string}`;

	interface ChartSpec {
		title: string;
		slug: string;
		group?: string;
	}
	interface ChartListProps {
		project?: ProjectIdentifier;
		charts?: ChartSpec[];
		baseUrl?: string;
	}
	let { project, charts = [], baseUrl }: ChartListProps = $props();

	const groups: string[] = $derived(
		Array.from(new Set(charts.map((c) => c.group).filter((c) => typeof c === 'string')))
	);

	const groupedCharts = $derived.by(() => {
		let res: { [key: string]: ChartSpec[] } = {};
		groups.forEach((g) => (res[g] = charts.filter((el) => el.group === g)));
		return res;
	});

	const ungroupedCharts = $derived(charts.filter((el) => !el.group));
</script>

<main>
	<div class="inner">
		<h1 data-testid="chartlist-project-title">Grafiken für <em>{project}</em></h1>
		{#if charts}
			<table>
				<thead>
					<tr>
						{#if groups.length > 0}
							<th>Group</th>
						{/if}
						<th>Title</th>
						<th>Embed URL</th>
					</tr>
				</thead>
				<tbody>
					{#each Object.values(groupedCharts) as charts}
						{#each charts as chart, i}
							<Row {chart} group={i === 0} rowspan={groupedCharts[chart.group].length} {baseUrl}
							></Row>
						{/each}
					{/each}
					{#each ungroupedCharts as chart, i}
						<Row
							{chart}
							{baseUrl}
							group={groups.length > 0 && i === 0}
							rowspan={ungroupedCharts.length === 1 ? 1 : 0}
						></Row>
					{/each}
				</tbody>
			</table>
		{/if}
		<p class="notes">Nutze die "Embed URL" um Grafiken in Sophora einzubinden.</p>
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-flow: column;
		font-family: var(--swr-sans);
		font-size: var(--fs-small-1);
		background: var(--color-pageFill);
		color: var(--color-textPrimary);
		margin: 0 auto;
		height: 90vh;
		* {
			margin: 0;
			padding: 0;
		}
	}
	.inner {
		margin: 0 auto;
		width: 100%;
		max-width: 40rem;
	}
	h1 {
		font-size: var(--fs-base);
		margin-bottom: 0.2em;
		em {
			background: rgba(134, 139, 84, 0.25);
			font-style: normal;
			padding: 0 0.3em;
			border-radius: 2px;
		}
	}
	table {
		border: 1px solid var(--color-surfaceBorder);
		border-collapse: collapse;
		border-spacing: 0;
		width: 100%;
	}

	th {
		text-align: left;
		padding: 0.2em 0.4em;
		border-right: 1px solid var(--color-textSecondary);
		border-bottom: 1px solid var(--color-textSecondary);
		&:last-child {
			border-right: 0;
		}
	}

	.notes {
		margin-top: 0.5em;
		color: var(--color-textSecondary);
		font-size: var(--fs-small-2);
	}
</style>

<script lang="ts">
	import { dev } from '$app/environment';
	import { asset } from '$app/paths';

	type ProjectPrefix = 'p' | 't';
	type ProjectIdentifier = `${ProjectPrefix}${number}: ${string}`;

	interface ChartSpec {
		title: string;
		slug: string;
	}
	interface ChartListProps {
		project?: ProjectIdentifier;
		charts?: ChartSpec[];
		baseUrl?: string;
	}
	let { project, charts, baseUrl }: ChartListProps = $props();
</script>

<main>
	<div class="inner">
		<h1 data-testid="chartlist-project-title">Grafiken für <em>{project}</em></h1>
		{#if charts}
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Embed URL</th>
					</tr>
				</thead>
				<tbody>
					{#each charts as chart}
						{@const fullUrl = baseUrl ? `${baseUrl}/${chart.slug}.html` : asset(chart.slug)}
						<tr>
							<td>
								<a href="{asset(chart.slug)}{dev ? '' : '.html'}">{chart.title}</a>
							</td>
							<td>
								<input type="text" value={fullUrl} />
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
	<p class="notes">Nutze die "Embed URL" um Grafiken in Sophora einzubinden.</p>
</main>

<style lang="scss">
	main {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-flow: column;
		font-family: var(--swr-sans);
		font-size: var(--fs-small-1);
		max-width: 40rem;
		margin: 0 auto;
		height: 90vh;
		* {
			margin: 0;
			padding: 0;
		}
	}
	.inner {
		width: 100%;
		border: 1px solid rgb(0, 0, 0);
	}
	h1 {
		font-size: var(--fs-base);
		border-bottom: 1px solid black;
		padding-bottom: 0.2em;
		background-color: rgb(255, 255, 255);
		em {
			background: rgb(234, 239, 184);
			font-style: normal;
			padding: 0 0.3em;
			border-radius: 2px;
		}
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
		width: 100%;
	}
	a {
		display: block;
		color: inherit;
		text-decoration: none;
	}
	th,
	td,
	h1 {
		padding: 0.2em 0.4em;
		text-align: left;
	}
	th {
		border-bottom: 1px solid black;
	}
	tr {
		border-bottom: 1px solid rgb(150, 150, 150);
		&:last-child {
			border-bottom: 0;
		}
	}

	input {
		display: block;
		font-family: monospace;
		width: calc(100% - 0.6em);
		padding: 0.1em 0.2em;
		font-size: inherit;
	}

	a:hover,
	a:focus-visible {
		text-decoration: underline;
	}
	a:last-child {
		border-bottom: 0;
	}
	.notes {
		margin-top: 0.5em;
		font-size: var(--fs-small-2);
	}
</style>

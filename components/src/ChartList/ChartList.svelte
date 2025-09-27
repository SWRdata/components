<script lang="ts">
	import { dev } from '$app/environment';

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
						{@const route = `/${chart.slug}`}
						<tr>
							<td>
								<a rel="external" href={dev ? route : `./${chart.slug}.html`}>
									{chart.title}
								</a>
							</td>
							<td>
								<input type="text" value={`${baseUrl ?? ''}${route}.html`} />
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
		color: var(--color-textPrimary);
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
		background: var(--color-surfaceFill);
		border: 1px solid var(--color-surfaceBorder);
	}
	h1 {
		font-size: var(--fs-base);
		border-bottom: 1px solid var(--color-textSecondary);
		padding-bottom: 0.2em;
		background-color: rgba(black, 0.2);
		em {
			background: rgba(134, 139, 84, 0.4);
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
		border-bottom: 1px solid var(--color-textSecondary);
	}
	tr {
		border-bottom: 1px solid var(--color-surfaceBorder);
		&:last-child {
			border-bottom: 0;
		}
	}

	input {
		display: block;
		font-family: monospace;
		width: calc(100% - 0.6em);
		padding: 0.2em 0.4em;
		font-size: 0.9rem;
		background: var(--color-pageFill);
		border: 1px solid var(--color-surfaceBorder);
		color: var(--color-textSecondary);
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
		color: var(--color-textSecondary);
		font-size: var(--fs-small-2);
	}
</style>

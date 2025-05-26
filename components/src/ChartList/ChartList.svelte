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
		<h1 data-testid="chartlist-project-title">Grafiken für {project}</h1>
		{#if charts}
			<table>
				<thead>
					<tr>
						<th>Title</th>
						{#if baseUrl}
							<th>Embed URL</th>
						{/if}
					</tr>
				</thead>
				<tbody>
					{#each charts as chart}
						<tr>
							<td>
								<a href="./{chart.slug}{dev ? '' : '.html'}">{chart.title}</a>
							</td>
							{#if baseUrl}
								<td>
									<input type="text" value={`${baseUrl}/${chart.slug}.html`} />
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</main>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		color: inherit;
	}
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
		font-family: var(--swr-sans);
		font-size: var(--fs-small-1);
		max-width: 60rem;
		margin: 0 auto;
	}
	.inner {
		width: 100%;
		border: 1px solid rgb(0, 0, 0);
	}
	h1 {
		font-size: var(--fs-small-1);
		width: 100%;
		border-bottom: 1px solid black;
		padding-bottom: 0.2em;
		background-color: rgb(233, 238, 245);
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
		width: 100%;
	}
	a {
		display: block;
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
		border-bottom: 1px solid black;
		&:last-child {
			border-bottom: 0;
		}
	}

	input {
		display: block;
		width: 100%;
		padding: 0.1em 0.3em;
	}

	a:hover,
	a:focus-visible {
		text-decoration: underline;
	}
	a:last-child {
		border-bottom: 0;
	}
</style>

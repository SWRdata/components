<script>
	const { chart, group = false, rowspan = 0, baseUrl } = $props();

	const fallbackUrl = $derived(`${baseUrl ?? ''}/${chart.slug ?? ''}`);
</script>

<tr>
	{#if group}
		<td {rowspan}>{chart.group}</td>
	{/if}
	<td>
		<a rel="external" href={chart.url ?? fallbackUrl + '.html'}>
			{chart.title}
		</a>
	</td>
	<td>
		<input type="text" value={chart.url ?? fallbackUrl + '.html'} />
	</td>
</tr>

<style>
	td {
		padding: 0.15em 0.4em;
		padding-bottom: 0;
		line-height: 1.5;
		text-align: left;
		vertical-align: top;
		border-right: 1px solid var(--color-surfaceBorder);
		&:last-child {
			border-right: 0;
		}
	}
	tr {
		border-bottom: 1px solid var(--color-surfaceBorder);
		&:last-child {
			border-bottom: 0;
		}
	}
	a {
		display: block;
		color: inherit;
		text-decoration: none;
	}

	input {
		display: block;
		font-family: monospace;
		width: 100%;
		padding: 0.35em 0;
		font-size: 0.9rem;
		background: var(--color-pageFill);
		color: var(--color-textSecondary);
		border: 0;
	}

	a:hover,
	a:focus-visible {
		text-decoration: underline;
	}
	a:last-child {
		border-bottom: 0;
	}
</style>

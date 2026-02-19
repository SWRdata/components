<script>
	import getDataFromUrl from '$lib/utils/getDataFromUrl';
	import { DesignTokens, HighlightCard } from '@swr-data-lab/components';
	import { onMount } from 'svelte';

	let root;
	let entries = [];

	onMount(() => {
		const { data } = getDataFromUrl(root);
		entries = data ? JSON.parse(data) : [];
	});
</script>

<DesignTokens>
	<div class="highlight-cards" bind:this={root}>
		{#each entries as entry}
			<HighlightCard
				topline={entry.topline}
				value={entry.value}
				unit={entry.unit}
				subline={entry.subline}
			/>
		{/each}
	</div>
</DesignTokens>

<style>
	.highlight-cards {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 2rem;
		margin: 0.5rem 0;

		@media (min-width: 1200px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>

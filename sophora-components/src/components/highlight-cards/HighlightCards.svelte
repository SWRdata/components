<script>
	import getDataFromUrl from '$lib/utils/getDataFromUrl';
	import DesignTokens from '@swr-data-lab/components/dist/DesignTokens/DesignTokens.svelte';
	import HighlightCard from '@swr-data-lab/components/dist/HighlightCard/HighlightCard.svelte';
	import { onMount } from 'svelte';

	let root;
	let entries = [];

	onMount(() => {
		const { data } = getDataFromUrl(root);
		entries = data ? JSON.parse(data) : [];
	});
</script>

<div class="highlight-cards" bind:this={root}>
	<DesignTokens>
		{#each entries as entry, index (index)}
			<HighlightCard
				topline={entry.topline}
				value={entry.value}
				unit={entry.unit}
				subline={entry.subline}
			/>
		{/each}
	</DesignTokens>
</div>

<style>
	.highlight-cards {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1rem;
		margin: 0.5rem 0;

		@media (min-width: 1200px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		/* Explicitly set background color for dark mode, workaround for SWR Aktuell App */
		@media (prefers-color-scheme: dark) {
			background-color: #0c0c0c;
		}
	}
</style>

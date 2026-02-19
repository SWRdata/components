<script>
	import { DesignTokens, HighlightCard } from '@swr-data-lab/components';
	import { onMount } from 'svelte';

	let root;
	let entries = [];

	const getData = (target) => {
		let url;
		if (
			import.meta.env.DEV ||
			window.location.origin === 'https://static.datenhub.net' ||
			window.location.href.includes('apidata.googleusercontent.com') ||
			window.location.href.includes('storage.googleapis.com')
		) {
			// Preview mode – use URL of current page
			url = new URL(window.location.href);
		} else {
			// Embedded mode – use URL used to embed the component
			const parent = target.parentNode.parentNode;
			url = new URL(parent?.dataset.url);
		}
		const params = Object.fromEntries(url.searchParams);
		return params.data ? JSON.parse(params.data) : [];
	};

	onMount(() => {
		entries = getData(root);
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

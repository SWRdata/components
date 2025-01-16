<script>
	import HighlightCard from '@components/HighlightCard';
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

<style>
	.highlight-cards {
		/* Apply SWR.de default spacing */
		padding-left: var(--cnt-wdth);
		padding-right: var(--cnt-wdth);

		@media (min-width: 1200px) {
			margin: 0 -1rem;
			display: flex;
		}
	}

	:global(.highlight-cards > *) {
		margin: 1rem 0;

		@media (min-width: 1200px) {
			margin: 1rem;
			flex: 1;
		}
	}
</style>

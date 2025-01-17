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
	/* 
     * Fonts need to be loaded in the component to work in the SWR Aktuell app, as no web fonts are present in the context. 
     * TODO: Move font loading elsewhere?
     */
	@font-face {
		font-family: 'SWR-VAR-Text';
		src: url('https://www.swr.de/assets/fonts/swr_type/SWR_VAR_WEB/SWR-VAR-Text.woff2')
			format('woff2');
	}
	@font-face {
		font-family: 'SWR-VAR-Sans';
		src: url('https://www.swr.de/assets/fonts/swr_type/SWR_VAR_WEB/SWR-VAR-Sans.woff2')
			format('woff2');
	}

	.highlight-cards {
		/* Apply SWR.de default spacing */
		padding-left: var(--cnt-wdth);
		padding-right: var(--cnt-wdth);
		padding-bottom: 1rem;

		@media (min-width: 1200px) {
			margin: 0 -1rem;
			display: flex;
		}
	}

	:global(.highlight-cards > *) {
		margin-bottom: 1rem;

		@media (min-width: 1200px) {
			margin: 0 1rem;
			flex: 1;
		}
	}
</style>

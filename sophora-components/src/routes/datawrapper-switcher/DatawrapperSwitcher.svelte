<script>
	import getDataFromUrl from '$lib/utils/getDataFromUrl';
	import { Switcher, DesignTokens } from '@swr-data-lab/components';
	import { onMount } from 'svelte';

	let activeIndex = $state(0);
	let root = $state(null);
	let labels = $state([]);
	let ids = $state([]);
	let fixedHeight = $state(null);
	let layout = $state('auto');

	let url = $state('');

	onMount(() => {
		const entries = getDataFromUrl(root);
		labels = entries.labels.split(',') || [];
		ids = entries.ids.split(',') || [];
		fixedHeight = entries.fixedHeight || null;
		layout = entries.layout || 'auto';

		url = window.location?.href;
	});
</script>

<div class="datawrapper-switcher" bind:this={root}>
	<DesignTokens theme="auto">
		<h1>Datawrapper switcher to be rendered here:</h1>
		<pre>{JSON.stringify({ labels, ids, fixedHeight, layout }, null, 2)}</pre>
		<pre>dataset url: {root?.parentNode?.parentNode?.dataset.url || 'n/a'}</pre>
		<pre>actual url: {url || 'n/a'}</pre>

		<!-- <Switcher
			options={labels}
			size="small"
			{activeIndex}
			{layout}
			value={labels[activeIndex]}
			onchange={({ currentTarget }) => {
				activeIndex = labels.indexOf(currentTarget.value);
			}}
		/> -->

		<!-- <div class="datawrapper-chart-container">
			{#each ids as id, index}
				<div
					class="datawrapper-chart"
					class:datawrapper-chart-active={index === activeIndex}
					style:height={fixedHeight ? fixedHeight + 'px' : 'auto'}
				>
					<script
						type="text/javascript"
						src={`https://datawrapper.dwcdn.net/${id}/embed.js`}
						charset="utf-8"
					></script>
				</div>
			{/each}
		</div> -->
	</DesignTokens>
</div>

<style>
	.datawrapper-chart-container {
		position: relative;
		width: 100%;
	}

	.datawrapper-chart {
		margin-top: 1rem;
		position: absolute;
		opacity: 0;
		z-index: -1;
		width: 100%;
		overflow: hidden;
	}

	.datawrapper-chart-active {
		position: relative;
		opacity: 1;
		z-index: 1;
	}
</style>

<script>
	import getDataFromUrl from '$lib/utils/getDataFromUrl';
	import { Switcher, DesignTokens } from '@swr-data-lab/components';
	import { browser } from '$app/environment';

	let activeIndex = $state(0);
	let root = $state(null);
	let labels = $state([]);
	let ids = $state([]);
	let fixedHeight = $state(null);
	let layout = $state('auto');

	let url = $state(browser ? window.location.href : null);
	let error = $state(null);

	console.log('DatawrapperSwitcher initialized with url:', url);
	$effect(() => {
		console.log('DatawrapperSwitcher mounted with root:', root);

		try {
			const entries = getDataFromUrl(root);
			labels = entries.labels?.split(',') || [];
			ids = entries.ids?.split(',') || [];
			fixedHeight = entries.fixedHeight || null;
			layout = entries.layout || 'auto';
		} catch (e) {
			console.error(e);
			error = e;
		}
	});
</script>

<div class="datawrapper-switcher" bind:this={root}>
	<DesignTokens theme="auto">
		<Switcher
			options={labels}
			size="small"
			{activeIndex}
			{layout}
			value={labels[activeIndex]}
			onchange={({ currentTarget }) => {
				activeIndex = labels.indexOf(currentTarget.value);
			}}
		/>

		<div class="datawrapper-chart-container">
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
		</div>

		<h3>Debug Information:</h3>
		<p>actual url: {url || 'n/a'}</p>
		<p>data-url: {root?.parentNode?.parentNode?.dataset.url || 'n/a'}</p>
		<br />
		<pre>{JSON.stringify({ labels, ids, fixedHeight, layout }, null, 2)}</pre>
		{#if error}
			<pre style="color: red">{error}</pre>
		{/if}
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

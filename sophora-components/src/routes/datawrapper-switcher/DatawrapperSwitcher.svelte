<script>
	import getDataFromUrl from '$lib/utils/getDataFromUrl';
	import { Switcher, DesignTokens } from '@swr-data-lab/components';
	import { onMount } from 'svelte';

	let activeIndex = 0;
	let root;
	let labels = [];
	let ids = [];
	let fixedHeight = null;
	let activeColor = null;

	onMount(() => {
		const entries = getDataFromUrl(root);
		labels = entries.labels.split(',') || [];
		ids = entries.ids.split(',') || [];
		fixedHeight = entries.fixedHeight || null;

		// TODO: Implement active color property
		activeColor = entries.activeColor || null;
	});
</script>

<DesignTokens theme="light">
	<Switcher
		options={labels}
		size="small"
		{activeIndex}
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
</DesignTokens>

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
	}

	.datawrapper-chart-active {
		position: relative;
		opacity: 1;
		z-index: 1;
	}
</style>

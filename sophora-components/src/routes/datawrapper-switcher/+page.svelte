<script>
	import { deserialize } from '$app/forms';
	import getDataFromUrl from '$lib/utils/getDataFromUrl';
	import Switcher from '@components/Switcher';
	import { DesignTokens } from '@components/DesignTokens';

	import { onMount } from 'svelte';

	let root;
	let labels = [];
	let ids = [];
	let fixedHeight = null;
	let activeColor = null;
	let activeIndex = 0;

	onMount(() => {
		const entries = getDataFromUrl(root);
		labels = entries.labels.split(',') || [];
		ids = entries.ids.split(',') || [];

		// TODO: Implement these properties
		fixedHeight = entries.fixedHeight || null;
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

	{#each ids as id, index}
		<div class="datawrapper-chart" class:datawrapper-chart-active={index === activeIndex}>
			<script
				type="text/javascript"
				src={`https://datawrapper.dwcdn.net/${id}/embed.js`}
				charset="utf-8"
			></script>
		</div>
	{/each}
</DesignTokens>

<style>
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

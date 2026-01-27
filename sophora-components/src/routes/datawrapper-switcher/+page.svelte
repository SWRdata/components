<script>
	import { deserialize } from '$app/forms';
	import getDataFromUrl from '$lib/utils/getDataFromUrl';
	import Switcher from '@components/Switcher';
	import { DesignTokens } from '@components/DesignTokens';
	import DevContainer from '@components/DevContainer';

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
		fixedHeight = entries.fixedHeight || null;

		// TODO: Implement active color property
		activeColor = entries.activeColor || null;
	});
</script>

<DevContainer paragraphsAbove={1} paragraphsBelow={1} showPlayer={false} showArticleHeader={false}>
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
</DevContainer>

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

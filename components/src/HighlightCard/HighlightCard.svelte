<script lang="ts">
	import Card from '../Card/Card.svelte';

	interface HighlightCardProps {
		topline?: string;
		value?: string;
		unit?: string;
		subline?: string;
	}

	let { topline, value, unit, subline }: HighlightCardProps = $props();
</script>

<Card>
	<div class="card-wrapper">
		{#if topline}
			<div class="top">
				{@html topline}
			</div>
		{/if}
		<div class="middle">
			<span class="underline">
				{value}
			</span>
			{unit}
		</div>
		{#if subline}
			<div class="bottom">
				{@html subline}
			</div>
		{/if}
	</div>
</Card>

<style lang="scss">
	.card-wrapper {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 200px;
	}

	.top {
		display: flex;
		align-items: flex-end;
		flex: 1;
	}

	.middle {
		font-size: var(--fs-large-4);
		font-weight: 700;
		padding-bottom: 0.2em;
	}

	.bottom {
		display: flex;
		align-items: flex-start;
		flex: 1;
	}

	.underline {
		width: fit-content;
		background: linear-gradient(to bottom, transparent 90%, var(--red-base) 90%);
	}
</style>

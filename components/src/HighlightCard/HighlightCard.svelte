<script>
	import Card from '../Card/Card.svelte';

	export let topline = '';
	export let value = '';
	export let unit = '';
	export let subline = '';
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
		<div class="bottom">
			{@html subline}
		</div>
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
		font-family: var(--swr-sans);
		font-size: 54px;
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

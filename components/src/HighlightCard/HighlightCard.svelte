<script>
	import Card from '../Card/Card.svelte';

	export let topline = '';
	export let highlight = '';
	export let highlightSecondary = '';
	export let subline = '';
	export let alignCards = true;
	export let maxWidth = '500px';
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
				{highlight}
			</span>
			{highlightSecondary}
		</div>
		<div class="bottom">
			{@html subline}
		</div>
	</div>
</Card>

<style lang="scss">
	@import '../styles/base.scss';

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
		font-family: $swr-sans;
		font-size: 60px;
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
		background: linear-gradient(to bottom, transparent 90%, $color-activeorange 90%);
	}
</style>

<script>
	import DevContainer from '@swr-data-lab/components/dist/DevContainer/DevContainer.svelte';
	import HighlightCards from './HighlightCards.svelte';

	const dev = import.meta.env.DEV;
</script>

{#if dev}
	<DevContainer
		theme="auto"
		showGrid
		paragraphsAbove={1}
		paragraphsBelow={1}
		showArticleHeader={false}
	>
		<HighlightCards />
	</DevContainer>
{:else}
	<HighlightCards />
{/if}

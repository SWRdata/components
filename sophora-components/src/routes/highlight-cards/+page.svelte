<script>
	import HighlightCards from './HighlightCards.svelte';
	import { dev } from '$app/environment';
	import { DevContainer } from '@swr-data-lab/components';
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

<script>
	import DevContainer from '@swr-data-lab/components/dist/DevContainer/DevContainer.svelte';
	import DatawrapperSwitcher from './DatawrapperSwitcher.svelte';

	const dev = import.meta.env.DEV;
</script>

{#if dev}
	<DevContainer
		paragraphsAbove={1}
		paragraphsBelow={1}
		showPlayer={false}
		showArticleHeader={false}
		theme="auto"
	>
		<DatawrapperSwitcher />
	</DevContainer>
{:else}
	<DatawrapperSwitcher />
{/if}

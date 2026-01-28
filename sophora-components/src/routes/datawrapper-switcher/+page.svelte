<script>
	import DevContainer from '@components/DevContainer';
	import DatawrapperSwitcher from './DatawrapperSwitcher.svelte';
	import { dev } from '$app/environment';
</script>

{#if dev}
	<DevContainer
		paragraphsAbove={1}
		paragraphsBelow={1}
		showPlayer={false}
		showArticleHeader={false}
	>
		<DatawrapperSwitcher />
	</DevContainer>
{:else}
	<DatawrapperSwitcher />
{/if}

<style>
</style>

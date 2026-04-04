<script lang="ts">
	import Component from './Component.svelte';
	import { DevContainer } from '@swr-data-lab/components';
</script>

<DevContainer
	showGrid
	theme="auto"
	showPlayer={false}
	paragraphsAbove={1}
	paragraphsBelow={1}
	showArticleHeader={false}
>
	<Component />
</DevContainer>

<script lang="ts">
	import Component from './Component.svelte';
	import DevContainer from '$lib/components/DevContainer.svelte';
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

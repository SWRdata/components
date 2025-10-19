<script lang="ts">
	import type { Snippet } from 'svelte';

	interface CopyProps {
		children?: Snippet;
	}
	let { children }: CopyProps = $props();
</script>

<div class="container">
	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="scss">
</style>

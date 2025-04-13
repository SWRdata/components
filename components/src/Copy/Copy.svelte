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

<style>
	.container {
		font-family: var(--swr-sans);
		font-size: var(--fs-base);
		letter-spacing: 0.0035em;
		line-height: 1.45;
	}
</style>

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface HeadlineProps {
		children?: Snippet;
	}
	let { children }: HeadlineProps = $props();
</script>

<h2 class="container">
	{#if children}
		{@render children()}
	{/if}
</h2>

<style>
	.container {
		font-family: var(--swr-sans);
		font-size: var(--fs-large-1);
		font-weight: 700;
		letter-spacing: 0.005em;
		line-height: 1.35;
	}
</style>

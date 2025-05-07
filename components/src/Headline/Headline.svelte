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
		font-family: var(--swr-text);
		font-size: var(--fs-large-1);
		font-weight: 550;
		letter-spacing: 0.005em;
	}
</style>

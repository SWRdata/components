<script lang="ts">
	import type { Snippet } from 'svelte';

	interface HeadlineProps {
		children?: Snippet;
		as?: string;
	}

	let { as = 'h2', children, ...rest }: HeadlineProps = $props();
</script>

<svelte:element this={as} class="container" {...rest}>
	{@render children?.()}
</svelte:element>

<style>
	.container {
		font-family: var(--swr-sans);
		font-size: var(--fs-large-1);
		font-weight: 700;
		letter-spacing: 0.005em;
		line-height: 1.35;
	}
</style>

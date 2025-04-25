<script lang="ts">
	import type { Snippet } from 'svelte';

	interface CaptionProps {
		weight?: 'regular' | 'bold';
		children?: Snippet;
	}
	let { weight = 'regular', children }: CaptionProps = $props();
</script>

<div class={['container', weight]}>
	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="scss">
	.container {
		font-family: var(--swr-sans);
		font-size: var(--fs-small-2);
		line-height: 1;
		letter-spacing: 0.0045em;
	}

	.bold {
		font-weight: 585;
		letter-spacing: 0;
	}
</style>

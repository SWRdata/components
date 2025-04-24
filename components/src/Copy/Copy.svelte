<script lang="ts">
	import type { Snippet } from 'svelte';

	interface CopyProps {
		weight: 'regular' | 'bold';
		children?: Snippet;
	}
	let { weight = 'regular', children }: CopyProps = $props();
</script>

<div class={['container', weight]}>
	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="scss">
	.container {
		font-family: var(--swr-sans);
		font-size: var(--fs-base);
		letter-spacing: 0.005em;
		line-height: 1.475;
		p {
			margin-bottom: 0.5em;
		}
	}

	.bold {
		font-weight: 585;
		letter-spacing: 0;
	}
</style>

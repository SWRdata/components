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
	.container {
		font-family: var(--swr-sans);
		font-size: var(--fs-base);
		letter-spacing: 0.0045em;
		line-height: 1.5;
		p {
			margin-bottom: 0.5em;
		}
	}
</style>

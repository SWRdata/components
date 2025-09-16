<script lang="ts">
	import type { Snippet } from 'svelte';

	interface NoteProps {
		children?: Snippet;
	}
	let { children }: NoteProps = $props();
</script>

<div class="container">
	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="scss">
	.container {
		font-family: var(--swr-sans);
		font-size: calc(var(--fs-small-2) * 0.9);
		line-height: 1.4;
		letter-spacing: 0.0015em;
		color: var(--color-textSecondary);

		:global(*) {
			color: inherit;
		}
		:global(p) {
			margin-bottom: 0.5em;
		}
		:global(a),
		:global(summary) {
			text-underline-offset: 0.15em;
			&:hover,
			&:focus-visible {
				color: var(--color-textSecondaryHover);
			}
		}
	}
</style>

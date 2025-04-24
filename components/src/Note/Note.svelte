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
		font-size: var(--fs-small-2);
		line-height: 1.4;
		letter-spacing: 0.001em;
		color: var(--gray-base);

		:global(*) {
			color: inherit;
		}
		:global(p) {
			margin-bottom: 0.5em;
		}
		:global(a),
		:global(summary) {
			&:hover,
			&:focus-visible {
				color: var(--gray-dark-3);
			}
		}
	}
</style>

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface SlideContentProps {
		children: Snippet;
	}

	let { children }: SlideContentProps = $props();
</script>

<div class="container">
	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="scss">
	.container {
		text-align: center;
		background: white;
		box-shadow: 0 0 10px 5px rgba(black, 0.05);
		border-radius: 5px;
		max-width: 45em;
		margin: 0 auto;
		padding: 1em 1.5em;
		@media (min-width: 500px) {
			padding: 1.5em;
			margin: 1em auto;
		}

		:global(svg) {
			height: 0.75em;
			position: relative;
			top: 2px;
			display: inline-block;
			margin-right: 0.1em;
		}
		:global(a) {
			text-decoration: none;
			border-bottom: 2px solid var(--gray-light-1);
			&:hover,
			&:focus-visible {
				background: var(--gray-light-4);
				border-bottom: 2px solid var(--gray-light-4);
			}
		}
	}
</style>

<script lang="ts">
	import { type Snippet } from 'svelte';

	interface FullscreenProps {
		children?: Snippet;
	}

	let { children }: FullscreenProps = $props();
</script>

<div class="container">
	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="scss">
	.container {
		--w: calc(100vw - 22px);
		width: var(--w);
		height: 100vh;
		margin: 0 auto;
		transform: translateX(calc((var(--w) - Min(510px, 100%)) * -0.5));

		@media (min-width: 768px) {
			transform: translateX(calc((var(--w) - 750px) * -0.5));
		}
		@media (min-width: 1200px) {
			transform: translateX(calc((var(--w) - 813px) * -0.5));
		}
	}
</style>

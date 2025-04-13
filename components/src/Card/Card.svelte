<script lang="ts">
	import type { Snippet } from 'svelte';
	import Copy from '../Copy/Copy.svelte';

	interface CardProps {
		children?: Snippet;
	}

	let { children }: CardProps = $props();
</script>

<div class="card">
	{#if children}
		<Copy>
			{@render children()}
		</Copy>
	{/if}
</div>

<style lang="scss">
	@use '../styles/base.scss';

	.card {
		color: white;
		width: auto;
		max-width: var(--app-max-width);
		background: var(--violet-dark-5);
		border-radius: var(--br-large);
		padding: 1.5rem;
		@media (min-width: base.$break-tablet) {
			padding: 2.5rem;
		}
	}
</style>

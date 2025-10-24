<script lang="ts">
	import { type Snippet } from 'svelte';

	interface SlideContentProps {
		height?: string;
		children: Snippet;
	}

	let { height = '100vh', children }: SlideContentProps = $props();
</script>

<section class="container" style:height>
	<div class="inner">
		{@render children?.()}
	</div>
</section>

<style lang="scss">
	.container {
		display: flex;
		align-items: center;
	}
	.inner {
		margin: 0 auto;
		padding: 1em 1.5em;
		color: var(--color-textPrimary);
		max-width: 40em;
		font-family: var(--swr-sans);
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: 0.01em;
		font-size: var(--fs-small-1);
		border-radius: 8px;
		background: var(--color-surfaceFill);
		box-shadow: 0 0 8px 1px var(--color-dropShadow);
		border: 1px solid var(--color-surfaceBorder);
		@media (min-width: 500px) {
			padding: 1.25em;
			margin: 1em auto;
		}
	}
</style>

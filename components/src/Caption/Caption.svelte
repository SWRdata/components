<script lang="ts">
	import type { Snippet } from 'svelte';

	interface CaptionProps {
		weight?: 'regular' | 'bold';
		as?: string;
		children?: Snippet;
	}
	let { weight = 'regular', as = 'div', children, ...rest }: CaptionProps = $props();
</script>

<svelte:element this={as} class={['container', weight]} {...rest}>
	{@render children?.()}
</svelte:element>

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

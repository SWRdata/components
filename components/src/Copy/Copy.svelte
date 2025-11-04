<script lang="ts">
	import type { Snippet } from 'svelte';

	interface CopyProps {
		weight?: 'regular' | 'bold';
		as?: string;
		children?: Snippet;
	}
	let { as = 'div', weight = 'regular', children, ...rest }: CopyProps = $props();
</script>

<svelte:element this={as} class={['container', weight]} {...rest}>
	{@render children?.()}
</svelte:element>

<style lang="scss">
	.container {
		font-family: var(--swr-sans);
		font-size: var(--fs-base);
		letter-spacing: 0.005em;
		line-height: 1.475;
	}

	.bold {
		font-weight: 585;
		letter-spacing: 0;
	}
</style>

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface FormLabelProps {
		as?: string;
		htmlFor?: string;
		children?: Snippet;
	}
	let { as = 'label', htmlFor, children }: FormLabelProps = $props();
</script>

{#if as == 'legend'}
	<legend class="container">
		{#if children}
			{@render children()}
		{/if}
	</legend>
{/if}
{#if as == 'label'}
	<label class="container" for={htmlFor}>
		{#if children}
			{@render children()}
		{/if}
	</label>
{/if}

<style>
	.container {
		font-family: var(--swr-text);
		font-size: var(--fs-small-1);
		font-weight: 400;
		margin-bottom: 0.25em;
		display: inline-block;
		letter-spacing: 0.005em;
	}
</style>

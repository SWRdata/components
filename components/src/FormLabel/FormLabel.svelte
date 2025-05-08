<script lang="ts">
	import type { Snippet } from 'svelte';

	interface FormLabelProps {
		htmlFor: string;
		children?: Snippet;
	}
	let { htmlFor, children }: FormLabelProps = $props();
</script>

<label class="container" for={htmlFor}>
	{#if children}
		{@render children()}
	{/if}
</label>

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

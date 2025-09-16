<script lang="ts">
	import type { Snippet } from 'svelte';
	import Headline from '../Headline/Headline.svelte';
	import Copy from '../Copy/Copy.svelte';
	import slugify from '../utils/slugify';

	interface ChartHeaderProps {
		title: string;
		subtitle?: string;
		align?: 'left' | 'center';
		children?: Snippet;
	}
	let { title, subtitle, align = 'left', children }: ChartHeaderProps = $props();
</script>

<header class={`container align-${align}`} id={slugify(title)}>
	<Headline>{title}</Headline>
	{#if subtitle}
		<Copy><p class="subtitle">{subtitle}</p></Copy>
	{/if}
	{#if children}
		<div class="content">
			{@render children()}
		</div>
	{/if}
</header>

<style>
	.container {
		color: var(--color-textPrimary);
		font-family: var(--swr-sans);
		display: flex;
		flex-flow: column;
		gap: 0.125rem;
	}
	.align-center {
		text-align: center;
	}
	.subtitle {
		text-wrap: balance;
	}
	.content {
		margin-top: 0.25em;
	}
</style>

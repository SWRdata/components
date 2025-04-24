<script lang="ts">
	import type { Snippet } from 'svelte';
	import Headline from '../Headline/Headline.svelte';
	import Copy from '../Copy/Copy.svelte';
	import slugify from '../utils/slugify';

	interface ChartHeaderProps {
		title: string;
		subtitle?: string;
		children?: Snippet;
	}
	let { title, subtitle, children }: ChartHeaderProps = $props();
</script>

<header class="container" id={slugify(title)}>
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
		color: var(--violet-blue);
		font-family: var(--swr-sans);
	}
	.subtitle {
		text-wrap: balance;
	}
	.content {
		margin-top: 0.25em;
	}
</style>

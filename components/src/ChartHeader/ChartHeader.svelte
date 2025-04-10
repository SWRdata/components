<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ChartHeaderProps {
		title: string;
		subtitle: string | null;
		content: Snippet | null;
	}
	let { title, subtitle = null, content = null }: ChartHeaderProps = $props();
</script>

<header class="container">
	<h2 class="title">{title}</h2>
	{#if subtitle}
		<p class="subtitle">{subtitle}</p>
	{/if}
	{#if content}
		<div class="content">
			{@render content()}
		</div>
	{/if}
</header>

<style>
	.container {
		color: var(--violet-blue);
		font-family: var(--swr-sans);
	}
	.title {
		font-size: var(--fs-large-3);
		line-height: 1.05;
		text-wrap: balance;
		font-weight: 700;
		margin-bottom: 0.2em;
	}
	.subtitle {
		text-wrap: balance;
		margin-bottom: 0.25em;
		font-size: var(--fs-large-1);
		&:last-child {
			margin-bottom: 0;
		}
	}
</style>

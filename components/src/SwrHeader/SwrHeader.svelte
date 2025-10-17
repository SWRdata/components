<script lang="ts">
	import { getContext, type Snippet } from 'svelte';

	import Caption from '../Caption/Caption.svelte';

	interface Byline {
		name: string;
		image?: string;
	}

	interface SwrHeaderProps {
		title: string;
		subtitle?: Snippet;
		eyebrow?: string;
		imageModules?: Record<string, any>;
		updated?: Date | string;
		bylines?: Byline[];
	}

	let theme = getContext('theme');
	const {
		title,
		subtitle,
		eyebrow,
		imageModules,
		updated,
		bylines = []
	}: SwrHeaderProps = $props();

	const updated_on = updated ? (updated instanceof Date ? updated : new Date(updated)) : null;
</script>

<header class={`container theme-${theme}`}>
	{#if eyebrow}
		<p class="eyebrow">{eyebrow}</p>
	{/if}
	<h1 class="title">{title}</h1>
	{#if subtitle}
		<p class="subtitle">
			{@render subtitle()}
		</p>
	{/if}
	<div class="meta">
		{#if bylines && bylines.length > 0}
			{@const nameString = `Von ${bylines.map((el) => (el.url ? `<a href='${el.url}'>${el.name}</a>` : el.name)).join(', ')}, <a href="https://www.swr.de/home/swr-data-lab-team-100.html">SWR Data Lab</a>`}
			<div class="bylines">
				{#if imageModules}
					<ul class="byline-images">
						{#each bylines.filter((el) => el.image && el.image in imageModules) as b, i}
							{@const src = imageModules[b.image].default}
							<li class="byline-image" style:z-index={bylines.length - i}>
								<enhanced:img {src} alt={b.name} />
							</li>
						{/each}
					</ul>
				{/if}
				<Caption>
					<p data-testid="byline-names" class="byline-names">{@html nameString}</p>
				</Caption>
			</div>
		{/if}
		{#if updated_on}
			<p class="updated" data-testid="updated">Stand: {updated_on.toLocaleDateString('de-DE')}</p>
		{/if}
	</div>
</header>

<style lang="scss">
	.container {
		color: var(--color-textPrimary);
		font-family: var(--swr-sans);
		margin: 0 auto;
		margin-bottom: 1rem;
		max-width: 44rem;
		text-shadow: 0 0 4px white;

		&.theme-dark {
			text-shadow: 0 0 8px rgba(black, 0.5);
		}
	}
	.eyebrow {
		font-size: var(--fs-small-1);
		margin-bottom: 1em;
		letter-spacing: 0.025em;
	}
	.title {
		font-family: var(--swr-sans);
		line-height: 1.2;
		letter-spacing: 0.002em;
		font-size: var(--fs-large-3);
		font-weight: 700;
		text-wrap: balance;
	}
	.subtitle {
		margin-top: 1.25em;
		font-family: var(--swr-sans);
		line-height: 1.45;
		font-size: var(--fs-base);
		font-weight: 400;
		text-shadow: none;
		hyphens: auto;
	}
	.meta {
		margin-top: 1.5em;
		display: flex;
		align-items: center;
		column-gap: 2em;
		flex-wrap: wrap;
	}
	.bylines {
		display: flex;
		flex-flow: column;
		gap: 0.5em;
		@media (min-width: 500px) {
			gap: 1em;
			align-items: center;
			flex-flow: row;
		}
	}
	.byline-images {
		display: flex;
	}
	.byline-image {
		position: relative;
		list-style: none;
		overflow: hidden;
		margin-right: -0.5em;
		box-shadow: 0 1px 2px 1px rgba(black, 0.15);
		border-radius: 1000px;
		border: 1px solid var(--color-pageFill);
		img {
			width: 2.25rem;
			height: auto;
			display: block;
		}
	}
	.byline-names {
		line-height: 1.35;
	}
	.updated {
		color: var(--color-textSecondary);
		font-size: var(--fs-small-2);
		letter-spacing: 0.025em;
	}
	:global(a) {
		text-underline-offset: 0.25em;
		text-decoration-color: var(--gray-light-1);
		&:hover,
		&:focus-visible {
			text-decoration-color: currentColor;
		}
	}
</style>

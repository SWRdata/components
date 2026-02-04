<script lang="ts">
	import { type Snippet } from 'svelte';

	import Caption from '../Caption/Caption.svelte';
	import dataLabImage from '../assets/data_lab.jpg?enhanced&w=200';

	interface Byline {
		name: string;
		image?: string;
		url?: string;
	}

	interface SwrHeaderProps {
		title: string;
		subtitle?: Snippet;
		eyebrow?: string;
		imageModules?: Record<string, any>;
		updated?: Date | string;
		bylines?: Byline[];
		showTextShadow?: boolean;
	}

	const {
		title,
		subtitle,
		eyebrow,
		imageModules,
		updated,
		bylines = [],
		showTextShadow = false
	}: SwrHeaderProps = $props();

	const updated_on = updated ? (updated instanceof Date ? updated : new Date(updated)) : null;
</script>

<header class="container" class:show-text-shadow={showTextShadow}>
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
		{#if updated_on}
			<dl class="date">
				<dt>Stand:</dt>
				<dd data-testid="updated">{updated_on.toLocaleDateString('de-DE')}</dd>
			</dl>
		{/if}
		{#if bylines && bylines.length > 0}
			<div class="bylines">
				{#if imageModules}
					<ul class="byline-images">
						{#each bylines.filter((el) => el.image && el.image in imageModules) as b, i}
							{@const src = imageModules[b.image].default}
							<li class="byline-image" style:z-index={bylines.length - i + 1}>
								<enhanced:img {src} alt={b.name} />
							</li>
						{/each}
						<li class="byline-image" style:z-index={0}>
							<enhanced:img src={dataLabImage} alt="SWR Data Lab" />
						</li>
					</ul>
				{/if}
				<Caption>
					<p data-testid="byline-names" class="byline-names">
						<span class="byline-prefix">Von</span>
						{#each bylines as byline, i}
							{#if i > 0},{/if}
							{#if byline.url}
								<a href={byline.url}>{byline.name}</a>
							{:else}
								{byline.name}
							{/if}
						{/each}, <a href="https://www.swr.de/home/swr-data-lab-team-100.html">SWR Data Lab</a>
					</p>
				</Caption>
			</div>
		{/if}
	</div>
</header>

<style lang="scss">
	$bp-sm: 640px;
	$bp-md: 768px;
	$bp-lg: 1024px;
	$bp-xl: 1280px;
	$content-max-width: 1312px;
	$grid-columns: 12;

	// Span of x columns including white-space in between
	@function span($cols) {
		@return calc(var(--column-width) * #{$cols} + var(--column-gap) * #{($cols - 1)});
	}

	// 14px baseline
	.container {
		color: var(--color-textPrimary);
		font-family: var(--swr-sans);
		margin: 0 auto;
		margin-bottom: 1rem;

		&.show-text-shadow {
			text-shadow: 0 0 6px color-mix(in srgb, var(--color-textPrimary) 50%, transparent);
		}

		:global([data-theme='dark']) &.show-text-shadow {
			text-shadow: 0 0 6px color-mix(in srgb, var(--color-textPrimary) 70%, transparent);
		}

		--margin: 16px;
		--column-gap: 16px;
		--grid-width: min(calc(100vw - var(--margin) * 2), #{$content-max-width});
		--column-width: calc(
			(var(--grid-width) - var(--column-gap) * #{($grid-columns - 1)}) / #{$grid-columns}
		);

		@media (min-width: $bp-sm) {
			max-width: span(10);
		}
		@media (min-width: $bp-lg) {
			max-width: span(8);
		}
	}
	.eyebrow {
		font-size: var(--fs-base);
		margin-bottom: 4px;
		line-height: 1.25;
		letter-spacing: 0.025em;
		font-weight: 600;
	}
	.title {
		font-family: var(--swr-sans);
		line-height: 1.175;
		letter-spacing: 0.002em;
		font-size: var(--fs-large-3);
		font-weight: 700;
		text-wrap: balance;
	}
	.subtitle {
		margin-top: 1.15em;
		font-family: var(--swr-sans);
		line-height: 1.25;
		font-size: var(--fs-base);
		font-weight: 500;
		hyphens: auto;
	}
	.meta {
		margin-top: 1.5em;
		display: flex;
		flex-flow: column;
		gap: 0.75em;
		@media (min-width: $bp-md) {
			flex-flow: row;
			gap: var(--column-gap);
		}
	}
	.date {
		font-size: var(--fs-small-1);
		dt {
			color: var(--color-textSecondary);
			font-weight: 400;
		}
		dd {
			margin: 0;
			color: var(--color-textPrimary);
			font-weight: 700;
		}
		@media (min-width: $bp-md) {
			flex: 0 0 span(3);
		}
		@media (min-width: 1200px) {
			flex: 0 0 span(2);
		}
	}
	.bylines {
		display: flex;
		flex-flow: column;
		gap: 8px;
		align-self: start;
		@media (min-width: $bp-sm) {
			flex: 1;
		}
	}
	.byline-images {
		display: flex;
	}
	.byline-image {
		position: relative;
		list-style: none;
		overflow: hidden;
		margin-right: -1em;
		border-radius: 1000px;
		border: 0.5px solid var(--color-surfaceBorder);
		img {
			width: 48px;
			height: 48px;
			max-width: none;
			display: block;
			object-fit: cover;
		}
	}
	.byline-names {
		font-weight: 700;
		line-height: 1.25;
	}
	.byline-prefix {
		font-weight: 400;
	}
	:global(a) {
		text-decoration: underline;
		text-underline-offset: 0.25em;
		text-decoration-color: var(--gray-light-1);
		&:hover,
		&:focus-visible {
			text-decoration-color: currentColor;
		}
	}
</style>

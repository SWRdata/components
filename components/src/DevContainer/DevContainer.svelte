<script lang="ts">
	import type { Snippet } from 'svelte';
	import SwrLogo from './SwrLogo.svg.svelte';
	import GridInspector from './GridInspector.svelte';

	interface DevContainerProps {
		showHeader?: boolean;
		showNav?: boolean;
		showPlayer?: boolean;
		showGrid?: boolean;
		showArticleHeader?: boolean;
		showBreadcrumbs?: boolean;
		title?: string;
		eyebrow?: string;
		intro?: string;
		children?: Snippet;
	}
	let {
		showHeader = true,
		showNav = true,
		showArticleHeader = true,
		showPlayer = true,
		eyebrow = 'Wärmewende in Ihrer Gemeinde',
		title = 'Baden-Württemberg heizt noch größtenteils fossil',
		intro = 'Fast drei Viertel der privaten Heizungen in Baden-Württemberg liefen 2022 noch mit Öl und Gas. In Neubauten werden inzwischen überwiegend Wärmepumpen eingebaut, doch es gibt regionale Unterschiede. Eine Datenanalyse des SWR zeigt, wie es bei Ihnen vor Ort aussieht.',
		showBreadcrumbs = true,
		showGrid = false,
		children
	}: DevContainerProps = $props();

	const date = new Date();
	let articleEl: HTMLElement | undefined = $state();
</script>

<div class="container">
	{#if showHeader}
		<header>
			<div class="header-inner">
				<SwrLogo />
			</div>
		</header>
	{/if}
	{#if showNav}
		<div class="nav">
			<div class="nav-inner grid">
				<i class="circle"></i>
				<ul>
					<li>Nachrichten Übersicht</li>
					<li>Baden-Württemberg</li>
					<li>Rheinland-Pfalz</li>
				</ul>
			</div>
		</div>
	{/if}
	{#if showBreadcrumbs}
		<div class="breadcrumbs"></div>
	{/if}

	{#if showPlayer}
		<div class="player">
			<i class="circle"></i>
			<div class="player-buttons">
				<i class="button"></i>
				<i class="button"></i>
			</div>
		</div>
	{/if}
	<article bind:this={articleEl} class="grid">
		{#if showGrid}
			<GridInspector target={articleEl}></GridInspector>
		{/if}
		{#if showArticleHeader}
			<div class="article-header">
				<p class="article-eyebrow">{eyebrow}</p>
				<h1 class="article-title">{title}</h1>
				<p class="article-intro">{intro}</p>
				<div class="article-meta">
					<p class="article-date">
						<span>Stand </span>
						{date.toLocaleDateString('de-DE')}
					</p>
					<div class="article-byline">
						<div class="byline-images">
							<i class="byline-image"></i>
							<i class="byline-image"></i>
							<i class="byline-image"></i>
						</div>
					</div>
				</div>
				<div class="article-actions">
					<i class="action-button"></i>
					<i class="action-button"></i>
				</div>
			</div>
		{/if}
		<div class="embed">
			{@render children?.()}
		</div>
	</article>
</div>

<style lang="scss">
	* {
		box-sizing: border-box;
	}
	:global(svg) {
		display: block;
	}
	.container {
		--blue: hsl(221, 75%, 46%);
		--blue-light: hsl(221, 100%, 95%);
		color: var(--blue);
		font-family: 'SWR-VAR-Sans', sans-serif;
	}
	header {
		display: flex;
		align-items: center;
		height: 64px;
		padding: 0 32px;
		background: var(--blue-light);
		border-bottom: 1px solid var(--blue);
	}
	.header-inner {
		width: 100%;
		max-width: 1312px;
		margin: 0 auto;
	}
	.nav {
		border-bottom: 1px solid var(--blue);
		.nav-inner {
			width: 100%;
		}
		ul {
			margin-left: -32px;
			display: flex;
			align-items: center;
			gap: 2.1em;
			grid-column: span 6;
			list-style: none;
		}
	}
	.nav,
	.breadcrumbs {
		height: 48px;
		padding: 0 40px;
		display: flex;
		align-items: center;
	}
	.circle {
		display: block;
		border-radius: 1000px;
		width: 32px;
		height: 32px;
		border: 1px solid var(--blue);
	}
	.button {
		display: block;
		border: 1px solid var(--blue);
		border-radius: 4px;
		width: 40px;
		height: 40px;
	}
	.player {
		width: 638px;
		height: 58px;
		bottom: 16px;
		left: 50%;
		border-radius: 4px;
		padding: 8px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		transform: translateX(-50%);
		background: var(--blue-light);
		border: 1px solid var(--blue);
		z-index: 100;
		position: fixed;
	}
	.player-buttons {
		column-gap: 8px;
		display: flex;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		column-gap: 16px;
		max-width: 1312px;
		width: auto;
		position: relative;
		@media (min-width: 1440px) {
			column-gap: 32px;
			margin: 0 auto;
		}
	}
	.article-header {
		grid-column: 2 / 10;
		margin-bottom: 24px;

		@media (min-width: 1440px) {
			grid-column: 4 / 10;
		}
	}
	.article-eyebrow {
		font-size: 0.875rem;
		font-weight: 500;
		@media (min-width: 1440px) {
			font-size: 1.25rem;
		}
	}
	.article-title {
		font-size: 2rem;
		line-height: 1.3;
		@media (min-width: 1440px) {
			font-size: 3rem;
		}
	}
	.article-intro {
		margin-top: 0.5em;
		hyphens: auto;
		font-size: 1.25rem;
		line-height: 1.25;
		@media (min-width: 1440px) {
			font-size: 1.5rem;
		}
	}
	.article-meta {
		display: flex;
		font-size: 0.875rem;
		align-items: center;
		height: 72px;
		border-bottom: 1px solid var(--blue);
	}
	.article-date {
		flex-basis: 30%;
		span {
			display: block;
		}
	}
	.article-byline {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.byline-images {
		display: flex;
		flex-flow: row-reverse;
	}
	.byline-image {
		display: block;
		border: 1px solid var(--blue);
		border-radius: 100px;
		width: 47px;
		background: white;
		height: 47px;
		margin-right: -10px;
		&:first-child {
			margin-right: 0;
		}
	}
	.article-actions {
		border-bottom: 1px solid var(--blue);
		height: 64px;
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.action-button {
		display: block;
		border: 1px solid var(--blue);
		border-radius: 4px;
		width: 60px;
		height: 32px;
	}
	.embed {
		grid-column: 4 / 10;
		// grid-column: 1 / 13;
		width: 100%;
	}
</style>

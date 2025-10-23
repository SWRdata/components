<script lang="ts">
	import type { Snippet } from 'svelte';
	import SwrLogo from './SwrLogo.svg.svelte';
	import GridInspector from './GridInspector.svelte';

	interface DevContainerProps {
		showHeader?: boolean;
		showNav?: boolean;
		showPlayer?: boolean;
		showArticleHeader?: boolean;
		showBreadcrumbs?: boolean;
		title: string;
		intro: string;
		children?: Snippet;
	}
	let {
		showHeader = true,
		showNav = true,
		showArticleHeader = true,
		showPlayer = true,
		title = 'Baden-Württemberg heizt noch größtenteils fossil',
		intro = 'Fast drei Viertel der privaten Heizungen in Baden-Württemberg liefen 2022 noch mit Öl und Gas. In Neubauten werden inzwischen überwiegend Wärmepumpen eingebaut, doch es gibt regionale Unterschiede. Eine Datenanalyse des SWR zeigt, wie es bei Ihnen vor Ort aussieht.',
		showBreadcrumbs = true,
		children
	}: DevContainerProps = $props();

	const date = new Date();
	let articleEl: HTMLElement | undefined = $state();
</script>

<div class="container">
	{#if showHeader}
		<header>
			<SwrLogo />
		</header>
	{/if}
	{#if showNav}
		<div class="nav">
			<i class="circle"></i>
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
	<article bind:this={articleEl}>
		<GridInspector target={articleEl}></GridInspector>
		{#if showArticleHeader}
			<div class="article-header">
				<p class="article-eyebrow">Eyebrow</p>
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
	.container {
		--blue: hsl(221, 75%, 46%);
		--blue-light: hsl(221, 100%, 95%);
		color: var(--blue);
	}
	header {
		display: flex;
		align-items: center;
		height: 64px;
		padding: 0 32px;
		background: var(--blue-light);
		border-bottom: 1px solid var(--blue);
	}
	.nav,
	.breadcrumbs {
		height: 48px;
		padding: 0 40px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--blue);
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
	article {
		display: grid;
		font-family: 'SWR-VAR-Sans', sans-serif;
		padding-top: 1rem;
		grid-template-columns: repeat(12, 1fr);
		column-gap: 16px;
		width: 100%;
		position: relative;
		&:after {
			content: '';
		}
		@media (min-width: 1440px) {
			column-gap: 32px;
		}
	}
	.article-header {
		grid-column: 2 / 10;
		margin-bottom: 24px;
	}
	.article-eyebrow {
		font-size: 0.875rem;
	}
	.article-title {
		font-size: 2rem;
	}
	.article-intro {
		margin-top: 0.35em;
		font-size: 1.25rem;
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

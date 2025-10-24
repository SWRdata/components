<script lang="ts">
	import type { Snippet } from 'svelte';
	import SwrLogo from './SwrLogo.svg.svelte';
	import GridInspector from './GridInspector.svelte';
	import Copy from '../Copy/Copy.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	interface DevContainerProps {
		showHeader?: boolean;
		showNav?: boolean;
		showPlayer?: boolean;
		showGrid?: boolean;
		showArticleHeader?: boolean;
		showBreadcrumbs?: boolean;
		paragraphsAbove?: number;
		paragraphsBelow?: number;
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
		intro = 'Fast drei Viertel der privaten Heizungen in Baden-Württemberg liefen 2022 noch mit Öl und Gas. In Neubauten werden inzwischen überwiegend Wärmepumpen eingebaut, doch es gibt regionale Unterschiede.',
		showBreadcrumbs = true,
		showGrid = false,
		paragraphsAbove = 0,
		paragraphsBelow = 0,
		children
	}: DevContainerProps = $props();

	const date = new Date();
	let articleEl: HTMLElement | undefined = $state();
</script>

<DesignTokens>
	<div class="container">
		{#if showHeader}
			<header>
				<div class="header-inner">
					<i class="logo">
						<SwrLogo />
					</i>
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
		<article bind:this={articleEl} class="grid article">
			{#if showGrid}
				<GridInspector target={articleEl}></GridInspector>
			{/if}
			{#if showArticleHeader}
				<div class="article-header">
					<span class="article-eyebrow">{eyebrow}</span>
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
			<div class="article-body">
				{#if paragraphsAbove > 0}
					{#each { length: paragraphsAbove }}
						<Copy as="p">
							Das SWR Data Lab hat Kaufpreise, Fahrzeugdaten und Betriebskosten von über 5.500
							Neuwagenmodellen von 2024 bis April 2025 aus dem ADAC-Autokatalog untersucht. Die
							Analyse zeigt, wie teuer ein Elektroauto, Diesel oder Benziner der unteren
							Mittelklasse beim Kauf und Betrieb über viele Jahre im Mittel ist.
						</Copy>
					{/each}
				{/if}
				<div class="embed">
					{@render children?.()}
				</div>
				{#if paragraphsBelow > 0}
					{#each { length: paragraphsBelow }}
						<Copy as="p">
							Das SWR Data Lab hat Kaufpreise, Fahrzeugdaten und Betriebskosten von über 5.500
							Neuwagenmodellen von 2024 bis April 2025 aus dem ADAC-Autokatalog untersucht. Die
							Analyse zeigt, wie teuer ein Elektroauto, Diesel oder Benziner der unteren
							Mittelklasse beim Kauf und Betrieb über viele Jahre im Mittel ist.
						</Copy>
					{/each}
				{/if}
			</div>
		</article>
	</div>
</DesignTokens>

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
		background: var(--blue-light);
		border-bottom: 1px solid var(--blue);
		height: 48px;
		padding: 0 16px;
		@media (min-width: 640px) {
			padding: 0 40px;
			height: 64px;
		}
	}
	.header-inner {
		width: 100%;
		max-width: 1312px;
		margin: 0 auto;
	}
	.logo {
		display: block;
		height: 24px;
		@media (min-width: 1440px) {
			height: 28px;
		}
		:global(svg) {
			height: 100%;
		}
	}
	.nav {
		border-bottom: 1px solid var(--blue);
		.nav-inner {
			width: 100%;
		}
		ul {
			display: flex;
			align-items: center;
			grid-column: 2 / -1;
			list-style: none;
			gap: 2.1em;
			white-space: nowrap;
			overflow: hidden;
			@media (min-width: 1440px) {
				margin-left: -32px;
			}
		}
	}
	.nav,
	.breadcrumbs {
		height: 48px;
		display: flex;
		align-items: center;
		padding: 0 16px;
		@media (min-width: 640px) {
			padding: 0 40px;
		}
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
	.article {
		margin: 0 16px;
		@media (min-width: 640px) {
			margin: 0 40px;
		}
		@media (min-width: 1024px) {
			margin: 0 48px;
		}
		@media (min-width: 1440px) {
			margin: 0 auto;
		}
	}
	.article-body {
		display: contents;
		:global(p) {
			margin-bottom: 1.5em;
			grid-column: 1/13;
			@media (min-width: 640px) {
				grid-column: 2 / 12;
			}
			@media (min-width: 1024px) {
				grid-column: 3 / 11;
			}
			@media (min-width: 1440px) {
				grid-column: 4/10;
			}
		}
	}
	.article-header {
		margin-bottom: 24px;
		grid-column: 1 / 13;

		@media (min-width: 640px) {
			grid-column: 2 / 12;
		}
		@media (min-width: 1024px) {
			grid-column: 3 / 11;
		}
		@media (min-width: 1440px) {
			grid-column: 4 / 10;
		}
	}
	.article-eyebrow {
		font-size: 0.875rem;
		font-weight: 500;
		@media (min-width: 1024px) {
			font-size: 1.25rem;
		}
	}
	.article-title {
		font-size: 2rem;
		line-height: 1.3;
		@media (min-width: 1024px) {
			line-height: 1.25;
			font-size: 3rem;
		}
	}
	.article-intro {
		margin-top: 0.5em;
		hyphens: auto;
		font-size: 1.25rem;
		line-height: 1.25;
		@media (min-width: 1024px) {
			font-size: 1.5rem;
		}
	}
	.article-meta {
		display: flex;
		font-size: 0.875rem;
		border-bottom: 1px solid var(--blue);
		flex-flow: column;
		gap: 8px;
		margin-top: 1rem;
		padding-bottom: 1rem;
		@media (min-width: 768px) {
			gap: 0;
			height: 72px;
			margin-top: 0;
			padding-bottom: 0;
			align-items: center;
			flex-flow: row;
		}
	}
	.article-date {
		flex-basis: 35%;
		display: flex;
		flex-flow: column;
		justify-content: center;
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
		width: 100%;
		grid-column: 1/13;
		@media (min-width: 640px) {
			grid-column: 2 / 12;
		}
		@media (min-width: 1024px) {
			grid-column: 3 / 11;
		}
		@media (min-width: 1440px) {
			grid-column: 4/10;
		}
	}
</style>

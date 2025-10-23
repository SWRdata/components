<script lang="ts">
	import type { Snippet } from 'svelte';
	import SwrLogo from './SwrLogo.svg.svelte';

	interface DevContainerProps {
		showHeader?: boolean;
		showNav?: boolean;
		showPlayer?: boolean;
		showBreadcrumbs?: boolean;
		children?: Snippet;
	}
	let {
		showHeader = true,
		showNav = true,
		showPlayer = true,
		showBreadcrumbs = true,
		children
	}: DevContainerProps = $props();
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

	<article>
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
		--blue: hsl(230, 100%, 50%);
		--blue-light: hsl(230, 100%, 95%);
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
		position: fixed;
	}
	.player-buttons {
		column-gap: 8px;
		display: flex;
	}
	article {
		display: grid;
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
	.embed {
		grid-column: 4 / 10;
		// grid-column: 1 / 13;
		width: 100%;
	}
</style>

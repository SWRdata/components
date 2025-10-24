<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
	import Breakout from './Breakout.svelte';
	import DevContainer from '../DevContainer/DevContainer.svelte';

	const { Story } = defineMeta({
		title: 'Layout/Breakout',
		component: Breakout,
		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<Story name="Default" asChild>
	<DevContainer
		title="Autokauf-Dilemma: Elektroautos teuer, Verbrenner bald auch"
		showPlayer={false}
		showGrid
		showArticleHeader={true}
		paragraphsAbove={1}
	>
		<DesignTokens>
			<div class="demo">
				<Breakout layout="medium">
					<div class="chart">medium</div>
				</Breakout>
				<Breakout layout="large">
					<div class="chart">large</div>
				</Breakout>
				<Breakout layout="bleed">
					<div class="chart">bleed</div>
				</Breakout>
			</div>
		</DesignTokens>
	</DevContainer>
</Story>

<style>
	.demo {
		position: relative;
		mix-blend-mode: multiply;
	}
	.chart {
		height: 200px;
		font-family: var(--swr-sans);
		background: hsl(15, 100%, 96%);
		border: 1px solid hsl(15, 100%, 35%);
		border-radius: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 2rem;
		color: hsl(15, 100%, 35%);
	}
</style>

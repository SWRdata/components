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
	<DevContainer showPlayer={false}>
		<DesignTokens>
			<div class="chart"></div>
		</DesignTokens>
	</DevContainer>
</Story>

<style>
	.chart {
		height: 400px;
		font-family: var(--swr-sans);
		background: hsl(15, 100%, 96%);
		border: 1px solid hsl(15, 100%, 35%);
		border-radius: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: hsl(15, 100%, 35%);
	}
</style>

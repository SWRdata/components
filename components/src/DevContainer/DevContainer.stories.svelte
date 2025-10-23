<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
	import DevContainer from './DevContainer.svelte';

	const { Story } = defineMeta({
		title: 'Meta/DevContainer',
		component: DevContainer,
		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<Story name="Default" asChild>
	<DevContainer>
		<DesignTokens>
			<div class="chart">your chart here</div>
		</DesignTokens>
	</DevContainer>
</Story>
<Story name="No Player" asChild>
	<DevContainer showPlayer={false}>
		<DesignTokens>
			<div class="chart">your chart here</div>
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

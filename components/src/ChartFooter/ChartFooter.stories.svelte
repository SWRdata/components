<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	import ChartFooter from './ChartFooter.svelte';
	import Middot from '../Middot/Middot.svelte';

	const { Story } = defineMeta({
		title: 'Chart/ChartFooter',
		component: ChartFooter
	});
</script>

<Story name="One-up" tags={['autodocs']}>
	<DesignTokens>
		<ChartFooter layout="one-up">
			{#snippet notes()}
				Daten: <a href="#1">Zensus 2022</a>
				(Durchschnittsmieten und Einwohnerzahlen),
				<a href="#1">OpenStreetMap</a> (Kartenmaterial) <Middot /> In unserer Darstellung wurde das Zensusgitter
				auf bewohnte Gebiete begrenzt.
			{/snippet}
		</ChartFooter>
	</DesignTokens>
</Story>

<Story name="Two-up">
	<DesignTokens>
		<ChartFooter layout="two-up">
			{#snippet notes()}
				Daten: <a href="#1">Zensus 2022</a>
				(Durchschnittsmieten und Einwohnerzahlen),
			{/snippet}
		</ChartFooter>
	</DesignTokens>
</Story>

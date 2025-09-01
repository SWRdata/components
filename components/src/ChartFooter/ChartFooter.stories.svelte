<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
	import { expect } from 'storybook/test';

	import ChartFooter from './ChartFooter.svelte';
	import Middot from '../Middot/Middot.svelte';

	const { Story } = defineMeta({
		title: 'Chart/ChartFooter',
		component: ChartFooter
	});
</script>

<Story name="One-up" asChild>
	<DesignTokens>
		<ChartFooter layout="one-up">
			Daten: <a href="#1">Zensus 2022</a>
			(Durchschnittsmieten und Einwohnerzahlen),
			<a href="#1">OpenStreetMap</a> (Kartenmaterial) <Middot /> In unserer Darstellung wurde das Zensusgitter
			auf bewohnte Gebiete begrenzt.
		</ChartFooter>
	</DesignTokens>
</Story>

<Story name="One-up Centered" asChild>
	<DesignTokens>
		<ChartFooter layout="one-up" align="center">
			Daten: <a href="#1">Zensus 2022</a>
			(Durchschnittsmieten und Einwohnerzahlen),
			<a href="#1">OpenStreetMap</a> (Kartenmaterial) <Middot /> In unserer Darstellung wurde das Zensusgitter
			auf bewohnte Gebiete begrenzt.
		</ChartFooter>
	</DesignTokens>
</Story>

<Story
	name="One-up Centered, no Logo"
	asChild
	play={async ({ step }) => {
		await step('Does not render the logo', async () => {
			const el = document.querySelector('.container > svg');
			expect(el).toBeFalsy();
		});
	}}
>
	<DesignTokens>
		<ChartFooter layout="one-up" align="center" showLogo={false}>
			Daten: <a href="#1">Zensus 2022</a>
			(Durchschnittsmieten und Einwohnerzahlen),
			<a href="#1">OpenStreetMap</a> (Kartenmaterial) <Middot /> In unserer Darstellung wurde das Zensusgitter
			auf bewohnte Gebiete begrenzt.
		</ChartFooter>
	</DesignTokens>
</Story>

<Story name="Two-up" asChild>
	<DesignTokens>
		<ChartFooter layout="two-up">
			Daten: <a href="#1">Zensus 2022</a>
			(Durchschnittsmieten und Einwohnerzahlen)
		</ChartFooter>
	</DesignTokens>
</Story>

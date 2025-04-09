<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ChartFooter from './ChartFooter.svelte';
	import Middot from '../Middot/Middot.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';


	const { Story } = defineMeta({
    title: 'Chart/ChartFooter',
	
    parameters: {
			docs: {
				description: {
					component:
						'Default footer for in-article charts.'
				}
			}
		},
    argTypes: {
      layout: {control: "inline-radio", options: ["one-up", "two-up"]},
    },
	args: {layout: "one-up"},
  })
</script>

<Story name="One-up">
	<DesignTokens>
		<ChartFooter layout="one-up">
			Daten: <a href="https://www.zensus2022.de/DE/Aktuelles/Hinweis_Zensusatlas.html#_ck0gbia65"
				>Zensus 2022</a
			>
			(Durchschnittsmieten und Einwohnerzahlen),
			<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> (Kartenmaterial) <Middot
			/> In unserer Darstellung wurde das Zensusgitter auf bewohnte Gebiete begrenzt.</ChartFooter
		>
	</DesignTokens>
</Story>

<Story name="Two-up">
	<DesignTokens>
		<ChartFooter layout="two-up">
			Daten: <a href="https://www.zensus2022.de/DE/Aktuelles/Hinweis_Zensusatlas.html#_ck0gbia65"
				>Zensus 2022</a
			>
			(Durchschnittsmieten und Einwohnerzahlen),
			<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> (Kartenmaterial) <Middot
			/> In unserer Darstellung wurde das Zensusgitter auf bewohnte Gebiete begrenzt.
		</ChartFooter>
	</DesignTokens>
</Story>

<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
	import Middot from '../Middot/Middot.svelte';

	import Note from './Note.svelte';

	const { Story } = defineMeta({
		title: 'Typography/Note'
	});
</script>

<Story name="Default">
	<DesignTokens>
		<Note>
			Daten: <a href="#1">Zensus 2022</a>
			(Durchschnittsmieten und Einwohnerzahlen),
			<a href="#1">OpenStreetMap</a> (Kartenmaterial) <Middot /> In unserer Darstellung wurde das Zensusgitter
			auf bewohnte Gebiete begrenzt.
		</Note>
	</DesignTokens>
</Story>

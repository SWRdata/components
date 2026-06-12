<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';

	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
	import Middot from '../Middot/Middot.svelte';

	import Note from './Note.svelte';

	const { Story } = defineMeta({
		title: 'Typography/Note',
		component: Note
	});
</script>

<Story name="Default" asChild>
	<DesignTokens theme="light">
		<Note>
			Daten: <a href="#1">Zensus 2022</a>
			(Durchschnittsmieten und Einwohnerzahlen),
			<a href="#1">OpenStreetMap</a> (Kartenmaterial) <Middot /> In unserer Darstellung wurde das Zensusgitter
			auf bewohnte Gebiete begrenzt.
		</Note>
	</DesignTokens>
</Story>

<Story
	name="Render as HTML element"
	asChild
	play={async ({ canvasElement, step }) => {
		const el = canvasElement.querySelector('p');
		await step('Renders as specified HTML element', async () => {
			expect(el).toBeTruthy();
		});
	}}
>
	<DesignTokens theme="light">
		<Note as="p">
			Daten: <a href="#1">Zensus 2022</a>
			(Durchschnittsmieten und Einwohnerzahlen),
			<a href="#1">OpenStreetMap</a> (Kartenmaterial) <Middot /> In unserer Darstellung wurde das Zensusgitter
			auf bewohnte Gebiete begrenzt.
		</Note>
	</DesignTokens>
</Story>

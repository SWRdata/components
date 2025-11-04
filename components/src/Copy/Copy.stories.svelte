<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';

	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	import Copy from './Copy.svelte';

	const { Story } = defineMeta({
		title: 'Typography/Copy',
		component: Copy
	});
</script>

<Story name="Default" asChild>
	<DesignTokens theme="light">
		<div class="container">
			<Copy>
				Björn Schittenhelm, Apotheker aus Holzgerlingen (Kreis Böblingen), bedient derzeit
				größtenteils Allergiegeplagte: "Wir gehen nahtlos von der Erkältungssaison in die
				Pollensaison hinein. Wir merken definitiv eine Veränderung über die letzten Jahre: Die
				Pollensaison wird länger, die Grippesaison wird länger und dadurch überlappt sich das
				Ganze."
			</Copy>
		</div>
	</DesignTokens>
</Story>
<Story name="Bold" asChild>
	<DesignTokens theme="light">
		<div class="container">
			<Copy weight="bold">
				Björn Schittenhelm, Apotheker aus Holzgerlingen (Kreis Böblingen), bedient derzeit
				größtenteils Allergiegeplagte: "Wir gehen nahtlos von der Erkältungssaison in die
				Pollensaison hinein. Wir merken definitiv eine Veränderung über die letzten Jahre: Die
				Pollensaison wird länger, die Grippesaison wird länger und dadurch überlappt sich das
				Ganze."
			</Copy>
		</div>
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
		<div class="container">
			<Copy as="p">
				Björn Schittenhelm, Apotheker aus Holzgerlingen (Kreis Böblingen), bedient derzeit
				größtenteils Allergiegeplagte: "Wir gehen nahtlos von der Erkältungssaison in die
				Pollensaison hinein. Wir merken definitiv eine Veränderung über die letzten Jahre: Die
				Pollensaison wird länger, die Grippesaison wird länger und dadurch überlappt sich das
				Ganze."
			</Copy>
		</div>
	</DesignTokens>
</Story>

<style>
	.container {
		color: var(--color-textPrimary);
	}
</style>

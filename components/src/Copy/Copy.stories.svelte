<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	import Copy from './Copy.svelte';

	const { Story } = defineMeta({
		title: 'Typography/Copy',
		component: Copy
	});
</script>

<Story name="Default">
	<DesignTokens>
		<Copy>
			Björn Schittenhelm, Apotheker aus Holzgerlingen (Kreis Böblingen), bedient derzeit
			größtenteils Allergiegeplagte: "Wir gehen nahtlos von der Erkältungssaison in die Pollensaison
			hinein. Wir merken definitiv eine Veränderung über die letzten Jahre: Die Pollensaison wird
			länger, die Grippesaison wird länger und dadurch überlappt sich das Ganze."
		</Copy>
	</DesignTokens>
</Story>
<Story name="Bold">
	<DesignTokens>
		<Copy weight="bold">
			Björn Schittenhelm, Apotheker aus Holzgerlingen (Kreis Böblingen), bedient derzeit
			größtenteils Allergiegeplagte: "Wir gehen nahtlos von der Erkältungssaison in die Pollensaison
			hinein. Wir merken definitiv eine Veränderung über die letzten Jahre: Die Pollensaison wird
			länger, die Grippesaison wird länger und dadurch überlappt sich das Ganze."
		</Copy>
	</DesignTokens>
</Story>

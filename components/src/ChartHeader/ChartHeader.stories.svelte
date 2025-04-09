<script context="module">
	import ChartHeader from './ChartHeader.svelte';
	import DesignTokens from '../DesignTokens/';

	export const meta = {
		title: 'Chart/ChartHeader',
		component: ChartHeader
	};
</script>

<script>
	import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="default">
	<DesignTokens>	
		<ChartHeader
			title="Mehr über-60-Jährige in allen Berufen"
			subtitle="Veränderung des Anteils der Beschäftigen über 60 Jahren in allen Berufsgruppen seit 2013 (Bundesweit)"
		/>
	</DesignTokens>
</Story>

<script context="module">
	import HighlightCard from './HighlightCard.svelte';

	export const meta = {
		title: 'Input Components/HighlightCard',
		component: HighlightCard
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import {
		userEvent,
		within,
		expect,
		getByTestId,
		getAllByLabelText,
		getByText
	} from '@storybook/test';
	import { hasContext } from 'svelte';

	let component;
</script>

<Story name="Basic HighlightCard">
	<HighlightCard
		topline="Die letzte Großspende liegt bei"
		highlight="375.000"
		highlightSecondary="Euro"
		subline="Der Betrag ging am 7. Januar von Dr. Kim Musterperson ein."
	/>
</Story>

<Story name="Basic HighlightCard">
	<div class="columns">
		<HighlightCard
			topline="Im aktuellen Jahr wurden bisher"
			highlight="375.000"
			highlightSecondary="€"
			subline="an Parteien gespendet."
		/>
		<HighlightCard
			topline="Die letzte Großspende liegt bei"
			highlight="37.500"
			highlightSecondary="€"
			subline="Der Betrag ging am 7. Januar von Dr. Kim Musterperson ein."
		/>
	</div>
</Story>

<style>
	.columns {
		display: flex;
		margin-top: 2rem;
	}

	:global(.columns > *) {
		flex: 1;
	}
</style>

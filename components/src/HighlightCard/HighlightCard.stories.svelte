<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import HighlightCard from './HighlightCard.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	const { Story } = defineMeta({
		title: 'Display/Card/HighlightCard',
		component: HighlightCard
	});
</script>

<Story name="Basic HighlightCard" asChild>
	<DesignTokens>
		<HighlightCard
			topline="Die letzte Großspende liegt bei"
			value="375.000"
			unit="Euro"
			subline="Der Betrag ging am 7. Januar von Dr. Kim Musterperson ein."
		/>
	</DesignTokens>
</Story>

<Story name="Multiple HighlightCards" asChild>
	<DesignTokens>
		<div class="highlight-cards">
			<HighlightCard
				topline="Im aktuellen Jahr wurden bisher"
				value="375.000"
				unit="€"
				subline="an Parteien gespendet."
			/>
			<HighlightCard
				topline="Die letzte Großspende liegt bei"
				value="37.500"
				unit="€"
				subline="Der Betrag ging am 7. Januar von Dr. Kim Musterperson ein."
			/>
		</div>
	</DesignTokens>
</Story>

<style>
	.highlight-cards {
		@media (min-width: 900px) {
			margin: 0 -1rem;
			display: flex;
		}
	}

	:global(.highlight-cards > *) {
		margin: 1rem 0;
		@media (min-width: 900px) {
			margin: 2rem 1rem;
			flex: 1;
		}
	}
</style>

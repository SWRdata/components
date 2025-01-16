<script>
	import HighlightCard from '@components/HighlightCard';
</script>

<div class="highlight-cards">
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

<style>
	.highlight-cards {
		display: flex;
		margin-top: 2rem;
	}

	:global(.highlight-cards > *) {
		flex: 1;
	}
</style>

<script lang="ts">
	import ChartList from '../../../components/src/ChartList/ChartList.svelte';
	import DesignTokens from '../../../components/src/DesignTokens/DesignTokens.svelte';

	const charts = [
		{ title: '348 Repro', slug: '348-repro' },
		{ title: 'Encapsulation Test', slug: 'encapsulation-test' },
		{ title: 'Hero Scrolly', slug: 'hero-scrolly' }
	];
</script>

<DesignTokens>
	<ChartList project="p000: Mock SvelteKit" {charts}></ChartList>
</DesignTokens>

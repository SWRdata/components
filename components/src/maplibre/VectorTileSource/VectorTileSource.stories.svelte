<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import VectorTileSource from './VectorTileSource.svelte';
	import Map from '../Map/Map.svelte';

	const { Story } = defineMeta({
		title: 'Map/VectorTileSource',
		component: VectorTileSource
	});
</script>

<Story asChild name="Basic">
	<Map>
		<VectorTileSource
			id="ev-infra-source"
			url={`https://static.datenhub.net/data/p108_e_auto_check/ev_infra_merged.versatiles?tiles/{z}/{x}/{y}`}
		/>
	</Map>
</Story>

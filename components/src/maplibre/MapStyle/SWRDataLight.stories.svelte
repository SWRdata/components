<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Map from '../Map/Map.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';
	import AttributionControl from '../AttributionControl/AttributionControl.svelte';

	const { Story } = defineMeta({
		title: 'Map/Style/SWR Data Lab Light',
		component: Map
	});
</script>

<Story asChild name="Basic">
	<DesignTokens>
		<div class="grid">
			<div class="container">
				<Map
					initialLocation={{ lng: 8.239451072800875, lat: 48.75692609731408, zoom: 14.99 }}
					showDebug
				>
					<AttributionControl />
				</Map>
			</div>
		</div>
	</DesignTokens>
</Story>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: auto;
		height: 700px;
	}
	.container {
		overflow: hidden;
	}
</style>

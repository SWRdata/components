<svelte:options customElement="navigation-control-test" />

<script lang="ts">
	import { Map, NavigationControl, DesignTokens, Scroller } from '../../../../components/src';

	let mapContext: any = $state();
	let status = $state();

	$effect(() => {
		if (mapContext) {
			mapContext.map.on('load', () => {
				status = 'loaded';
			});
		}
	});
</script>

<DesignTokens theme="auto">
	<div class="container">
		<Scroller>
			{#snippet background()}
				<div class="map">
					<Map bind:mapContext>
						<NavigationControl showCompass />
					</Map>
					<p class="status">{status}</p>
				</div>
			{/snippet}
			{#snippet foreground()}
				test
			{/snippet}
		</Scroller>
	</div>
</DesignTokens>

<style>
	.container {
		padding: 5%;
		max-width: 30rem;
	}
	.map {
		aspect-ratio: 4 / 3;
		margin-bottom: 1em;
	}
</style>

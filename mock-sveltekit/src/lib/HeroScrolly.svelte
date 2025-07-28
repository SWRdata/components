<svelte:options customElement="p118-hero-scrolly" />

<script lang="ts">
	import { DesignTokens, ChartFooter, Copy, Map, SWRDataLabLight } from '@swr-data-lab/components';
	import Scroller from '@sveltejs/svelte-scroller';
	import Fullscreen from './components/Fullscreen.svelte';
	import SlideContent from './components/SlideContent.svelte';
	import { dev } from '$app/environment';

	const slides = [
		{
			copy: `Ganz entscheidend beim demografischen Wandel sind die <strong>Babyboomer</strong>, also die geburtenstarken Jahrgänge zwischen 1955 und 1969. Sie strömten in den 1970er- und 1980er-Jahren auf den Arbeitsmarkt. Die Zahl der <em class='men'>Männer</em> und <em class='women'>Frauen</em> im Erwerbsalter wuchs Jahr für Jahr, das mittlere Alter lag in Baden-Württemberg bei 35 Jahren.`,
			location: { lon: 10.61935, lat: 51.171, zoom: 6 }
		},
		{
			copy: `In den folgenden Jahrzehnten rückte der Babyboomer-Bauch in die Mitte der Gesellschaft. Die Geburtenzahlen gingen zurück, die Lebenserwartung stieg, die Bevölkerung alterte moderat.`,
			location: { lon: 9.1813, lat: 48.777, zoom: 11.5 }
		},
		{
			copy: `Seitdem schiebt sich der Babyboomer-Bauch unaufhaltsam ins Rentenalter. Dieses Jahr feiern in Baden-Württemberg etwa 156.000 Menschen ihren 65. Geburtstag, aber nur 111.000 Menschen ihren 18. Geburtstag. Die Zahl der Renteneintritte übersteigt die der Berufseinsteiger deutlich.`,
			location: { lon: 9.181, lat: 48.772, zoom: 13.5, pitch: 25 }
		},
		{
			copy: `In den kommenden Jahren wird diese Lücke weiter wachsen: Immer mehr Rentnerinnen und Rentner stehen immer weniger Kindern und Erwerbstätigen gegenüber.`,
			location: { lon: 9.18, lat: 48.7712, zoom: 17, pitch: 45 }
		},
		{
			copy: `Erst Ende des nächsten Jahrzehnts, wenn viele Babyboomer verstorben sind, dürfte sich das Verhältnis zwischen Jüngeren und Älteren wieder einpendeln. Bis dahin gleicht die Bevölkerungspyramide einer Urne, rund die Hälfte der Menschen in Baden-Württemberg wird 45 Jahre oder älter sein.`,
			location: { lon: 9.1754, lat: 48.7704, zoom: 13.4, pitch: 43 }
		}
	];

	let index = $state(0);
	let progress = $state(0);
	let mapContext: any = $state();

	$effect(() => {
		const location = slides[index]?.location;
		if (location) {
			mapContext.map?.flyTo({
				center: [location.lon, location.lat],
				zoom: location.zoom,
				pitch: location.pitch || 0
			});
		}
	});

	const resizeMap = () => {
		mapContext.map.resize();
	};
</script>

<DesignTokens>
	<figure class="container">
		<Scroller bind:index bind:progress>
			<div slot="background" class="background">
				<Fullscreen>
					{#if dev}
						<pre class="debug">{Object.entries({ index, progress })
								.map(([key, val]) => `${key}: ${val}`)
								.join('\n')}</pre>
					{/if}
					<div class="map" bind:contentBoxSize={null, resizeMap}>
						<Map
							bind:mapContext
							maxZoom={17}
							showDebug={dev}
							style={SWRDataLabLight({ enableBuildingExtrusions: true })}
						></Map>
					</div>
				</Fullscreen>
			</div>
			<div slot="foreground">
				{#each slides as s}
					<section class="slide" style:height={`120vh`}>
						<SlideContent>
							<Copy>
								<p>
									{@html s.copy}
								</p>
							</Copy>
						</SlideContent>
					</section>
				{/each}
			</div>
		</Scroller>
		<figcaption>
			<ChartFooter layout="one-up"
				>Daten: © OpenStreetMap contributors, © GeoBasis-DE/<a href="https://www.bkg.bund.de"
					>BKG
				</a>
				({new Date().getFullYear()}),
				<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></ChartFooter
			>
		</figcaption>
	</figure>
</DesignTokens>

<style lang="scss">
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		color: inherit;
	}
	.container {
		width: 100%;
		margin: 0 auto;
		margin-top: 16px;
		margin-bottom: 24px;
	}
	figcaption {
		padding-top: 1.25em;
	}
	.background {
		position: relative;
		justify-content: center;
		pointer-events: none;
		height: 100vh;
	}
	.map {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}
	.debug {
		padding: 0.5em;
		color: rgb(170, 37, 3);
		font-size: 16px;
		position: fixed;
		top: 0;
		left: 1em;
		z-index: 100;
	}

	.slide {
		display: flex;
		flex-flow: column;
		justify-content: center;
		&:first-of-type {
			height: 160vh !important;
			padding-top: 40vh;
		}
		&:last-of-type {
			height: 160vh !important;
			padding-bottom: 40vh;
		}
	}
</style>

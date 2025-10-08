<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Scroller from './Scroller.svelte';

	const { Story } = defineMeta({
		title: 'Display/Scroller',
		component: Scroller,
		parameters: {
			viewMode: 'docs',
			previewTabs: {
				canvas: { hidden: true }
			}
		}
	});

	let index = $state(0);
	let offset = $state(0);
	let progress = $state(0);
</script>

<Story name="Default" asChild>
	<div>
		<h1>Scroller-Demo</h1>
		<p>(Scroll down to see the scroller in action)</p>

		<Scroller top={0.2} bottom={0.8} bind:index bind:offset bind:progress>
			<div slot="background">
				<p>
					This is the background content. It will stay fixed in place while the foreground scrolls
					over the top.
				</p>
				<p>
					<strong>Section {index + 1}</strong> is currently active.
				</p>

				<p><code>index</code> / {index}</p>
				<p><code>offset</code> / {offset}</p>
				<p><code>progress</code> / {progress}</p>
			</div>
			<div slot="foreground">
				<section>This is the first section.</section>
				<section>This is the second section.</section>
				<section>This is the third section.</section>
				<section>This is the fourth section.</section>
				<section>This is the fifth section.</section>
			</div>
		</Scroller>
	</div>
</Story>

<style>
	section {
		height: 25vh;
		background: #cccc;
		padding: 0.5rem;
		margin-bottom: 50vh;
	}

	p {
		padding: 0.5rem;
	}
</style>

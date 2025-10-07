<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Scroller from './Scroller.svelte';

	const { Story } = defineMeta({
		title: 'Scroller',
		component: Scroller
	});

	let index = $state(0);
	let offset = $state(0);
	let progress = $state(0);
</script>

<Story name="Default" asChild>
	<div style="height: 400px; overflow: scroll;">
		Scroll down to see the scroller in action.
		<Scroller top={0.2} bottom={0.8} bind:index bind:offset bind:progress>
			<div slot="background">
				<p>
					This is the background content. It will stay fixed in place while the foreground scrolls
					over the top.
				</p>
				<p>
					<strong>Section {index + 1}</strong> is currently active .
				</p>

				<div>
					<code>index</code>
					<progress min="0" max="4" value={index}>{index}</progress>
					<code>{index}</code>
				</div>

				<div>
					<code>offset</code>
					<progress min="0" max="1" value={offset}>{offset}</progress>
					<code>{offset}</code>
				</div>

				<div>
					<code>progress</code>
					<progress min="0" max="1" value={progress}>{progress}</progress>
					<code>{progress}</code>
				</div>
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
		height: 80vh;
		border: 1px solid #ccc;
	}

	p {
		margin: 0 0 1em;
	}
</style>

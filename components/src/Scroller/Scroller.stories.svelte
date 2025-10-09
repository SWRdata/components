<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';

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

<Story
	name="Default"
	asChild
	play={async ({ step, canvasElement }) => {
		await step('Verify state values are set', async () => {
			expect(index).toBeGreaterThanOrEqual(0);
			expect(offset).toBeGreaterThanOrEqual(0);
			expect(progress).toBeGreaterThanOrEqual(0);
		});

		await step('Foreground content is rendered', async () => {
			const sections = canvasElement.querySelectorAll('svelte-scroller-foreground section');
			expect(sections).toHaveLength(5);
			expect(sections[0]).toHaveTextContent('This is the first section.');
		});

		await step('Background content is rendered', async () => {
			const background = canvasElement.querySelector('svelte-scroller-background');
			expect(background).toBeDefined();
			expect(background).toHaveTextContent('This is the background content');
		});

		await step('Index is updated when scrolling', async () => {
			// Store the event handler function separately
			const scrollEndHandler = () => {
				expect(index).toBe(3);
				// Clean up the event listener after test has run
				window.removeEventListener('scrollend', scrollEndHandler);
				// Reset scroll position to top after test
				window.scrollTo(0, 0);
			};

			// Add the event listener with the stored function reference
			window.addEventListener('scrollend', scrollEndHandler);

			const sections = canvasElement.querySelectorAll('svelte-scroller-foreground section');
			sections[3].scrollIntoView();
		});
	}}
>
	<div>
		<Scroller top={0.2} bottom={0.8} bind:index bind:offset bind:progress>
			{#snippet background()}
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
			{/snippet}

			{#snippet foreground()}
				<section>This is the first section.</section>
				<section>This is the second section.</section>
				<section>This is the third section.</section>
				<section>This is the fourth section.</section>
				<section>This is the fifth section.</section>
			{/snippet}
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

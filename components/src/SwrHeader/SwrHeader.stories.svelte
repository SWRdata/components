<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
	import { expect, within } from 'storybook/test';
	import SwrHeader from './SwrHeader.svelte';

	const { Story } = defineMeta({
		title: 'Display/SwrHeader',
		component: SwrHeader
	});

	const imageModules = import.meta.glob('./test/**.jpg', {
		eager: true,
		query: { enhanced: true, w: 200 }
	});
</script>

<Story
	name="Default"
	asChild
	play={async ({ step, canvasElement }) => {
		const canvas = within(canvasElement);
		await step('Renders names list', async () => {
			const containerEl = canvas.getByTestId('byline-names');
			expect(containerEl.textContent).toBe('Von Katharina Forstmair, Tom Burggraf, SWR Data Lab');
		});
		await step('Renders date', async () => {
			const containerEl = canvas.getByTestId('updated');
			expect(containerEl.textContent).toBe('Stand: 10.1.2025');
		});
	}}
>
	<DesignTokens theme="light">
		<SwrHeader
			{imageModules}
			title="Große Pläne: Wie Städte klimaneutral heizen wollen"
			eyebrow="Wärmewende in Baden-Württemberg"
			updated="01-10-2025"
			bylines={[
				{ name: 'Katharina Forstmair', image: './test/forstmair.jpg' },
				{ name: 'Tom Burggraf', image: './test/burggraf.jpg' }
			]}
		>
			{#snippet subtitle()}
				<span class="intro">
					Drei Kommunen, drei Pläne, ein Ziel: Städte und Gemeinden müssen in Wärmeplänen
					festhalten, wie in Zukunft vor Ort klimaneutral geheizt werden soll. Die Pläne von
					Stuttgart, Lörrach und Vaihingen zeigen, vor welchen Herausforderungen das Land bei der
					Wärmewende steht.
				</span>
			{/snippet}
		</SwrHeader>
	</DesignTokens>
</Story>

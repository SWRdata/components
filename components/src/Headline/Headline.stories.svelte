<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';

	import DesignTokens from '../DesignTokens/DesignTokens.svelte';
	import Headline from './Headline.svelte';

	const { Story } = defineMeta({
		title: 'Typography/Headline',
		component: Headline
	});
</script>

<Story name="Default" asChild>
	<DesignTokens theme="light">
		<div class="container">
			<Headline>Baden-Württemberg heizt überdurchschnittlich viel mit Wärmepumpe</Headline>
		</div>
	</DesignTokens>
</Story>

<Story
	name="Render as HTML element"
	asChild
	play={async ({ canvasElement, step }) => {
		const el = canvasElement.querySelector('h3');
		await step('Renders as specified HTML element', async () => {
			expect(el).toBeTruthy();
		});
	}}
>
	<DesignTokens theme="light">
		<div class="container">
			<Headline as="h3">This should be a H3</Headline>
		</div>
	</DesignTokens>
</Story>

<Story
	name="Render rest props"
	asChild
	play={async ({ canvasElement, step }) => {
		const el = canvasElement.querySelector('h3');
		await step('Renders the rest prop', async () => {
			expect(el).toHaveAttribute('id', 'foo');
		});
	}}
>
	<DesignTokens theme="light">
		<div class="container">
			<Headline as="h3" id="foo">This should have an ID of "foo"</Headline>
		</div>
	</DesignTokens>
</Story>

<style>
	.container {
		color: var(--color-textPrimary);
	}
</style>

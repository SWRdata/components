<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	import Caption from './Caption.svelte';

	const { Story } = defineMeta({
		title: 'Typography/Caption',
		component: Caption
	});
</script>

<Story name="Default" asChild>
	<DesignTokens theme="light">
		<div class="container">
			<Caption>Björn Schittenhelm, Apotheker aus Holzgerlingen (Kreis Böblingen)</Caption>
		</div>
	</DesignTokens>
</Story>

<Story name="Bold" asChild>
	<DesignTokens theme="light">
		<div class="container">
			<Caption weight="bold">
				Björn Schittenhelm, Apotheker aus Holzgerlingen (Kreis Böblingen)
			</Caption>
		</div>
	</DesignTokens>
</Story>

<Story
	name="Render as HTML element"
	asChild
	play={async ({ canvasElement, step }) => {
		const el = canvasElement.querySelector('p');
		await step('Renders as specified HTML element', async () => {
			expect(el).toBeTruthy();
		});
	}}
>
	<DesignTokens theme="light">
		<div class="container">
			<Caption weight="bold" as="p">
				Björn Schittenhelm, Apotheker aus Holzgerlingen (Kreis Böblingen)
			</Caption>
		</div>
	</DesignTokens>
</Story>

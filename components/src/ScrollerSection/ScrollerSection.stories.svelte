<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ScrollerSection from './ScrollerSection.svelte';
	import Scroller from '../Scroller/Scroller.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	const { Story } = defineMeta({
		title: 'Display/ScrollerSection',
		component: ScrollerSection,
		parameters: {
			viewMode: 'docs',
			previewTabs: {
				canvas: { hidden: true }
			}
		}
	});

	let index = $state(0);
</script>

<Story name="Default" asChild>
	<DesignTokens theme="dark">
		<div>
			<Scroller bind:index>
				{#snippet background()}
					<p>
						This is the background content. It will stay fixed in place while the foreground scrolls
						over the top. Index: {index}
					</p>
				{/snippet}

				{#snippet foreground()}
					<ScrollerSection
						>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo earum dolore nam debitis
						velit aliquam quae, minima praesentium ratione et.
					</ScrollerSection>
					<ScrollerSection
						>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo earum dolore nam debitis
						velit aliquam quae, minima praesentium ratione et.
					</ScrollerSection>
					<ScrollerSection
						>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo earum dolore nam debitis
						velit aliquam quae, minima praesentium ratione et.
					</ScrollerSection>
				{/snippet}
			</Scroller>
		</div>
	</DesignTokens>
</Story>

<style>
	p {
		padding: 0.5rem;
	}
</style>

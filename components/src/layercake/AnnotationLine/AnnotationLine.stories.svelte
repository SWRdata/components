<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AnnotationLine from './AnnotationLine.svelte';
	import DesignTokens from '../../DesignTokens/DesignTokens.svelte';

	const { Story } = defineMeta({
		title: 'Layercake/AnnotationLine',
		component: AnnotationLine
	});
</script>

<Story asChild name="Default">
	<DesignTokens theme="light"></DesignTokens>
</Story>

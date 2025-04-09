<script context="module">
	import Logotype from './Logotype.svelte';
	import DesignTokens from '../DesignTokens';

	export const meta = {
		title: 'Chart/Logotype',
		component: Logotype
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Story name="Basic">
	<DesignTokens>
		<Logotype></Logotype>
	</DesignTokens>
</Story>


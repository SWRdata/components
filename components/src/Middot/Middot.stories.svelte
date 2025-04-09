<script context="module">
	import Middot from './Middot.svelte';
	import DesignTokens from '../DesignTokens';

	export const meta = {
		title: 'Chart/Middot',
		component: Middot
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Story name="Basic">
	<DesignTokens>
		<Middot></Middot>
	</DesignTokens>
</Story>


<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	const { Story } = defineMeta({
		title: 'Form/Button'
	});
</script>

<Story name="Basic">
	<DesignTokens>
		<Button label="This is a button label"></Button>
	</DesignTokens>
</Story>
<Story name="Disabled">
	<DesignTokens>
		<Button disabled label="This button is disabled"></Button>
	</DesignTokens>
</Story>

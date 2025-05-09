<script>
	import Select from './Select.svelte';
	import FormLabel from '../FormLabel/FormLabel.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	let { args = null, selectedItem = $bindable(), demoComponent = null } = $props();
</script>

<DesignTokens>
	{#if demoComponent}
		{@render demoComponent()}
	{:else}
		<FormLabel htmlFor={args.inputId}>Select</FormLabel>
		<Select {...args} bind:value={selectedItem} />
	{/if}
</DesignTokens>

{#if selectedItem}
	<pre class="output">
value = {JSON.stringify(selectedItem, null, ' ')}</pre>
{/if}

<style>
	.output {
		display: block;
		margin-top: 1rem;
		padding: 1rem;
		background: #fcfaff;
		color: rgb(18, 69, 139);
	}
</style>

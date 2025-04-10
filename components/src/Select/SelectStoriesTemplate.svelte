<script>
	import Select from './Select.svelte';
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	let { args = null, selectedItem = $bindable(), demoComponent = null } = $props();
</script>

<DesignTokens>
	{#if demoComponent}
		{@render demoComponent()}
	{:else}
		<label for={args.inputId}>Select</label>
		<Select {...args} bind:value={selectedItem} />
	{/if}
</DesignTokens>

{#if selectedItem}
	<pre class="output">
value = {JSON.stringify(selectedItem, null, ' ')}</pre>
{/if}

<style>
	label {
		display: block;
		font-family: var(--swr-sans);
		margin-bottom: 0.25em;
	}
	.output {
		display: block;
		margin-top: 1rem;
		padding: 1rem;
		background: #fcfaff;
		color: rgb(18, 69, 139);
	}
</style>

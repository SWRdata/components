<script lang="ts">
	import FormLabel from '../FormLabel/FormLabel.svelte';

	export let label: string = '';
	export let name: string = '';
	export let placeholder: string = '';
	export let value: string = '';
</script>

<div class="container">
	<FormLabel htmlFor={name}>{label}</FormLabel>
	<input {name} type="text" {placeholder} bind:value />
</div>

<style lang="scss">
	@use '../styles/base.scss';

	input {
		@extend %form-input;
	}
</style>

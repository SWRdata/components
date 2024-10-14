<script lang="ts">
	export let label: string = '';
	export let name: string = '';
	export let placeholder: string = '';
	export let value: string = '';
</script>

<div class="container">
	<label for={name}>{label}</label>
	<input {name} type="text" {placeholder} bind:value />
</div>

<style lang="scss">
	@import '../styles/base.scss';

	label {
		@extend %form-label;
	}
	input {
		@extend %form-input;
	}
</style>

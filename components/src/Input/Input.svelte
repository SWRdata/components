<script>
	export let inputType = 'text';
	export let placeholder = '';
	export let id = '';
	export let label = '';
</script>

<div class="container">
	<label for={id}>{label}</label>
	<input {id} type={inputType} {placeholder} />
</div>

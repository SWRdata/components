<svelte:options customElement="swrdata-element" />

<script>
	import Switcher from '@components/Switcher';
</script>

<div class="container">
	<p>I'm inside the Svelte app and inside the shadow DOM, so I don't inherit global styles.</p>
	<Switcher options={['Apples', 'Oranges']} />
</div>

<style>
	.container {
		all: initial;
	}
</style>

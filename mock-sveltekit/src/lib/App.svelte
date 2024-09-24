<svelte:options customElement="swrdata-element" />

<script>
	import Switcher from '@components/Switcher';
</script>

<p>I'm inside the Svelte app and inside the shadow DOM, so I don't inherit global styles.</p>
<Switcher options={['Apples', 'Oranges']} />

<style>
	p {
		background: pink;
	}
</style>

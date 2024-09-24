<script>
	import { dev } from '$app/environment';
	import App from '../lib/App.svelte';
</script>

<p>I'm inside the Svelte app but outside the shadow DOM</p>
{#if dev}
	<App />
{:else}
	<swrdata-element />
{/if}

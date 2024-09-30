<script>
	import { dev } from '$app/environment';
	import App from '../lib/App.svelte';
</script>

{#if dev}
	<App />
{:else}
	<swrdata-element />
{/if}

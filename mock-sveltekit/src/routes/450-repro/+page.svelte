<script lang="ts">
	import Component from './Component.svelte';
	import DevContainer from '$lib/components/DevContainer.svelte';
	import { dev } from '$app/environment';
</script>

{#if dev}
	<Component></Component>
{:else}
	<geocoder-test></geocoder-test>
{/if}

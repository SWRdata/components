<script lang="ts">
	import type { Snippet } from 'svelte';
	import Logotype from '../Logotype/Logotype.svelte';
	import Note from '../Note/Note.svelte';

	interface ChartFooterProps {
		layout: 'one-up' | 'two-up';
		children?: Snippet;
	}

	let { layout = 'one-up', children }: ChartFooterProps = $props();
</script>

<footer class={`container ${layout}`}>
	{#if children}
		<Note>
			{@render children()}
		</Note>
	{/if}
	<Logotype />
</footer>

<style lang="scss">
	@use '../styles/base.scss';

	.container {
		gap: 0.5rem;
		:global(div) {
			width: 100%;
		}
	}
	.one-up {
		display: flex;
		flex-flow: column;
		align-items: flex-start;
	}
	.two-up {
		display: grid;
		grid-template-columns: 1fr;
		@media (min-width: base.$break-phone) {
			grid-template-columns: 2.5fr 1fr;
			align-items: last baseline;
			justify-items: flex-end;
		}
	}
</style>

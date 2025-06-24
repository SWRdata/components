<script lang="ts">
	import type { Snippet } from 'svelte';
	import Logotype from '../Logotype/Logotype.svelte';
	import Note from '../Note/Note.svelte';

	interface ChartFooterProps {
		layout?: 'one-up' | 'two-up';
		align?: 'left' | 'center';
		children?: Snippet;
	}

	let { layout = 'one-up', align = 'left', children }: ChartFooterProps = $props();
</script>

<footer class={`container ${layout} align-${align}`}>
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
		&.align-center {
			align-items: center;
			text-align: center;
			text-wrap: balance;
		}
	}
	.two-up {
		display: grid;
		grid-template-columns: 1fr;
		@media (min-width: base.$bp-s) {
			grid-template-columns: 2.5fr 1fr;
			align-items: last baseline;
			justify-items: flex-end;
		}
	}
</style>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Logotype from '../Logotype/Logotype.svelte';

	interface ChartFooterProps {
		layout: 'one-up' | 'two-up';
		notes: Snippet | null;
	}

	let { layout = 'one-up', notes }: ChartFooterProps = $props();
</script>

<footer class={`container ${layout}`}>
	{#if notes}
		<div class="notes">
			{@render notes()}
		</div>
	{/if}
	<Logotype />
</footer>

<style lang="scss">
	@use '../styles/base.scss';

	.container {
		gap: 0.5rem;
		font-size: var(--fs-small-1);
		font-family: var(--swr-sans);
		line-height: 1.4;
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
	.notes {
		width: 100%;
	}
	footer :global(*) {
		margin-bottom: 0;
		color: var(--gray-base);
	}
	footer :global(a),
	footer :global(summary) {
		&:hover,
		&:focus-visible {
			color: var(--gray-dark-3);
		}
	}
</style>

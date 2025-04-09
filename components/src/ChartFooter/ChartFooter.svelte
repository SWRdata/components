<script>
	import Logotype from '../Logotype/Logotype.svelte';
	
	export let layout = 'one-up';

</script>

<footer class={`container ${layout}`}>
	<div class="notes">
		<slot />
	</div>
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
			color: rgb(50, 50, 50);
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
		@media(min-width: base.$break-phone) {
			grid-template-columns: 2.5fr 1fr;
			align-items: last baseline;
			justify-items: flex-end;
		}
	}
</style>

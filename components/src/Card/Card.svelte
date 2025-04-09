<div class="card">
	<slot />
</div>

<style lang="scss">
	@use '../styles/base.scss';

	.card {
		@extend %copy;
		color: white;
		width: auto;
		max-width: var(--app-max-width);
		background: var(--violet-dark-5);
		border-radius: var(--br-large);
		padding: 1.5rem;
		@media (min-width: base.$break-tablet) {
			padding: 2.5rem;
		}
	}
</style>

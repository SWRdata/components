<div class="container">
	<slot />
</div>

<style lang="scss">
	@import '../styles/base.scss';

	.container {
		width: auto;
		max-width: var(--app-max-width);
		color: white;
		background: var(--reanimation-violetblue);
		border-radius: var(--border-radius-container);
		margin: 0 1rem;
		padding: 1.5rem;
	}
</style>

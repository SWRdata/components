<div class="card">
	<slot />
</div>

<style lang="scss">
	@import '../styles/base.scss';
	.card {
		@extend %copy;
		color: white;
		width: auto;
		max-width: $app-max-width;
		background: var(--violet-dark-5);
		border-radius: var(--br-large);
		padding: 1.5rem;
		@include bp($break-tablet) {
			padding: 2.5rem;
		}
	}
</style>

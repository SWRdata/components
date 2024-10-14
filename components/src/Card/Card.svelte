<div class="card">
	<slot />
</div>

<style lang="scss">
	@import '../styles/base.scss';
	.card {
		width: auto;
		max-width: $app-max-width;
		color: white;
		background: $reanimation-violetblue;
		border-radius: $border-radius-container;
		margin: 0 1rem;
		padding: 1.5rem;
		@include bp($break-tablet) {
			padding: 2.5rem;
		}
	}
</style>

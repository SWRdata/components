<div class="card">
	<slot />
</div>

<style lang="scss">
	@import '../styles/base.scss';
	.card {
		@extend %copy;
		width: auto;
		max-width: $app-max-width;
		color: white;
		background: $color-violetblue;
		border-radius: $border-radius-container;
		padding: 1.5rem;
		@include bp($break-tablet) {
			padding: 2.5rem;
		}
	}
</style>

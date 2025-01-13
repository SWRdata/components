<div>
	<slot />
</div>

<style lang="scss">
	@import '../styles/base.scss';
	:host {
		--swr-sans: #{$swr-sans};
		--swr-text: #{$swr-text};
		--orange: #{$color-activeorange};
	}
</style>

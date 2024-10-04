<slot />

<style lang="scss">
	@import '../styles/base.scss';

	@font-face {
		font-family: 'SWR-VAR-Sans';
		font-weight: 400 600 700;
		font-display: swap;
		src:
			local('SWR-VAR-Sans'),
			url('https://www.swr.de/assets/fonts/swr_type/SWR_VAR_WEB/SWR-VAR-Sans.woff2') format('woff2');
	}
	@font-face {
		font-family: 'SWR-VAR-Text';
		font-weight: 400 600 700;
		font-display: swap;
		src:
			local('SWR-VAR-Text'),
			url('https://www.swr.de/assets/fonts/swr_type/SWR_VAR_WEB/SWR-VAR-Text.woff2') format('woff2');
	}
	:root {
		--swr-sans: #{$swr-sans};
		--swr-text: #{$swr-text};
		--orange: #{$orange};
	}
</style>

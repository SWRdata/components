<script lang="ts">
	import { shades } from './Tokens';

	const rules = [
		...Object.keys(shades).map((key) => {
			return Object.entries(shades[key])
				.map(([shade, value]) => {
					const [ldb, index] = shade.split(/(\d+)/);
					return ldb === 'base'
						? `--${key}-${ldb}: ${value}`
						: `--${key}-${ldb}-${index}: ${value}`;
				})
				.join(';');
		})
	];
</script>

<div class="container" style={rules.join(';')}>
	<slot />
</div>

<style lang="scss">
	@use '../styles/base.scss';

	:global(*) {
		margin: 0;
		padding: 0;
	}

	.container {
		display: contents;
		--fast: 150ms;
		--slow: 300ms;
		--app-max-width: 40rem;
		--br-large: 8px;
		--br-small: 4px;
		--input-height: 2.5rem;
		--swr-sans: 'SWR-VAR-Sans', sans-serif;
		--swr-text: 'SWR-VAR-Text', sans-serif;

		// Type scale copied 1:1 from swr.de

		--fs-small-3: 0.75rem;
		--fs-small-2: 0.875rem;
		--fs-small-1: 1rem;
		--fs-base: 1.125rem;
		--fs-large-1: 1.25rem;
		--fs-large-2: 1.5rem;
		--fs-large-3: 1.75rem;

		@media (min-width: base.$bp-m) {
			--fs-small-3: 0.75rem;
			--fs-small-2: 0.875rem;
			--fs-small-1: 1rem;
			--fs-base: 1.25rem;
			--fs-large-1: 1.5rem;
			--fs-large-2: 2rem;
			--fs-large-3: 2.5rem;
		}
	}
</style>

<script>
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
		}),
		,
		'display: contents',
		'--fast: 150ms',
		'--slow: 300ms',
		'--br-large: 8px',
		'--br-small: 4px',
		'--ratio: 1.15',
		'--swr-sans: "SWR-VAR-Sans", sans-serif',
		'--swr-text: "SWR-VAR-Text", sans-serif',
		'--fs-small-3: calc(var(--fs-small-2) / var(--ratio))',
		'--fs-small-2: calc(var(--fs-small-1) / var(--ratio))',
		'--fs-small-1: calc(var(--fs-base) / var(--ratio))',
		'--fs-base: clamp(1rem, calc(1.5vw + 0.25rem), 1.125rem)',
		'--fs-large-1: calc(var(--fs-base) * var(--ratio))',
		'--fs-large-2: calc(var(--fs-large-1) * var(--ratio))',
		'--fs-large-3: calc(var(--fs-large-2) * var(--ratio))'
	];
</script>

<div class="container" style={rules.join(';')}>
	<slot />
</div>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
	}
</style>

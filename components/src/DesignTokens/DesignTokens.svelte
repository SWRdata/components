<script lang="ts">
	import type { Snippet } from 'svelte';
	import { shades, semantics } from './Tokens';
	import isDarkMode from '../isDarkMode';

	interface DesignTokensProps {
		theme?: 'light' | 'dark' | 'auto';
		children?: Snippet;
	}

	let { theme = 'auto', children }: DesignTokensProps = $props();

	let computedTheme = $derived(theme === 'auto' ? ($isDarkMode ? 'dark' : 'light') : theme);

	const colours = { ...shades, ...semantics };
	const rules = [
		...Object.keys(colours).map((key) => {
			return Object.entries(colours[key])
				.map(([shade, value]) => {
					const [ldb, index] = shade.split(/(\d+)/);
					return ldb === 'base'
						? `--${key}-${ldb}: ${value}`
						: `--${key}-${ldb}${index ? `-${index}` : ''}: ${value}`;
				})
				.join(';');
		})
	];
</script>

<div class="container" style={rules.join(';')} data-theme={computedTheme}>
	{#if children}
		{@render children()}
	{/if}
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

		--color-textPrimary: var(--textPrimary-light);
		--color-textSecondary: var(--textSecondary-light);
		--color-textSecondaryHover: var(--textSecondaryHover-light);
		--color-logoFill: var(--logoFill-light);
		--color-pageFill: var(--pageFill-light);
		--color-surfaceFill: var(--surfaceFill-light);

		&[data-theme='dark'] {
			--color-logoFill: var(--logoFill-dark);
			--color-pageFill: var(--pageFill-dark);
			--color-surfaceFill: var(--surfaceFill-dark);
			--color-textPrimary: var(--textPrimary-dark);
			--color-textSecondary: var(--textSecondary-dark);
			--color-textSecondaryHover: var(--textSecondaryHover-dark);
		}

		--swr-text: 'SWR-VAR-Text', sans-serif;
		--swr-sans: 'SWR-VAR-Sans', sans-serif;

		// Type scale copied 1:1 from swr.de
		--fs-small-3: 0.75rem;
		--fs-small-2: 0.875rem;
		--fs-small-1: 1rem;
		--fs-base: 1.125rem;
		--fs-large-1: 1.25rem;
		--fs-large-2: 1.5rem;
		--fs-large-3: 2rem;
		--fs-large-4: 2.25rem;

		@media (min-width: 1024px) {
			--fs-small-3: 0.75rem;
			--fs-small-2: 0.875rem;
			--fs-small-1: 1rem;
			--fs-base: 1.25rem;
			--fs-large-1: 1.5rem;
			--fs-large-2: 2rem;
			--fs-large-3: 3rem;
			--fs-large-4: 3.5rem;
		}
	}
</style>

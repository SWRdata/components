<script lang="ts">
	import type { Snippet } from 'svelte';

	interface BreakoutProps {
		layout: 'small' | 'medium' | 'large' | 'bleed';
		children?: Snippet;
	}
	let { layout = 'medium', children }: BreakoutProps = $props();
</script>

<div class={`container ${layout}`}>
	{@render children?.()}
</div>

<style lang="scss">
	$bp-sm: 640px;
	$bp-md: 768px;
	$bp-lg: 1024px;
	$bp-xl: 1280px;
	$content-max-width: 1312px;
	$grid-columns: 12;

	// Span of x columns including white-space in between
	@function span($cols) {
		@return calc(var(--column-width) * #{$cols} + var(--column-gap) * #{($cols - 1)});
	}

	// Negative margin of x columns including white-space
	@function offset($cols) {
		@return calc((var(--column-width) + var(--column-gap)) * -#{$cols});
	}

	// Bleed helper to calculate negative margin based on number of columns
	@function bleed($cols) {
		@return calc((var(--column-width) + var(--column-gap)) * -#{$cols} - var(--margin));
	}

	.container {
		--margin: max(16px, calc((100vw - #{$content-max-width}) / 2));
		--column-gap: 16px;
		--grid-width: min(calc(100vw - var(--margin) * 2), #{$content-max-width});
		--column-width: calc(
			(var(--grid-width) - var(--column-gap) * #{($grid-columns - 1)}) / #{$grid-columns}
		);

		max-width: 100vw;
		margin: 0 auto;
	}

	.small {
		width: span(10);
		@media (min-width: $bp-sm) {
			width: span(8);
		}
		@media (min-width: $bp-lg) {
			width: span(6);
		}
	}

	.medium {
		@media (min-width: $bp-lg) {
			width: span(10);
			margin-left: offset(1);
		}
	}

	.large {
		width: span(12);
		@media (min-width: $bp-sm) {
			margin-left: offset(1);
		}
		@media (min-width: $bp-lg) {
			margin-left: offset(2);
		}
	}

	.bleed {
		width: 100vw;
		margin-left: bleed(0);
		@media (min-width: $bp-sm) {
			margin-left: bleed(1);
		}
		@media (min-width: $bp-lg) {
			margin-left: bleed(2);
		}
	}
</style>

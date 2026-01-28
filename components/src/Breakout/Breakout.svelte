<script lang="ts">
	import type { Snippet } from 'svelte';

	interface BreakoutProps {
		layout: 'thumbnail' | 'medium' | 'large' | 'bleed';
		children?: Snippet;
	}
	let { layout = 'medium', children }: BreakoutProps = $props();
</script>

<div class={`container ${layout}`}>
	{@render children?.()}
</div>

<style lang="scss">
	.container {
		--margin: 16px;
		--column-gap: 16px;
		--column-width: calc((var(--grid-width) - var(--column-gap) * 11) / 12);
		--grid-width: calc(100vw - var(--margin) * 2);

		@media (min-width: 640px) {
			--margin: 40px;
		}
		@media (min-width: 768px) {
			--margin: 40px;
		}
		@media (min-width: 1024px) {
			--margin: 48px;
			--column-gap: 32px;
		}
		@media (min-width: 1440px) {
			--grid-width: calc(Min(1312px, 100vw));
			--margin: calc((100vw - var(--grid-width)) * 0.5);
		}
	}

	.small {
		width: calc(var(--column-width) * 10 + var(--column-gap) * 8);
		margin-left: calc((var(--column-width) * 1) + (var(--column-gap)) * 1);
		@media (min-width: 640px) {
			width: calc(var(--column-width) * 8 + var(--column-gap) * 6);
			margin-left: calc((var(--column-width) * 1) + (var(--column-gap)) * 1);
		}
		@media (min-width: 1024px) {
			width: calc(var(--column-width) * 6 + var(--column-gap) * 5);
			margin-left: calc((var(--column-width) * 1) + (var(--column-gap)) * 1);
		}
	}

	.medium {
		@media (min-width: 1024px) {
			width: calc(var(--column-width) * 10 + var(--column-gap) * 9);
			margin-left: calc((var(--column-width) * -1) + (var(--column-gap)) * -1);
		}
	}
	.large {
		@media (min-width: 640px) {
			width: calc(var(--column-width) * 12 + var(--column-gap) * 11);
			margin-left: calc((var(--column-width) * -1 + var(--column-gap) * -1));
		}
		@media (min-width: 1024px) {
			width: calc(var(--column-width) * 12 + var(--column-gap) * 11);
			margin-left: calc((var(--column-width) * -2 + var(--column-gap) * -2));
		}
	}
	.bleed {
		width: 100vw;
		margin-left: calc(var(--margin) * -1);

		@media (min-width: 640px) {
			margin-left: calc(var(--column-width) * -1 + (var(--column-gap)) * -1 - var(--margin) * 1);
		}
		@media (min-width: 768px) {
			margin-left: calc(var(--column-width) * -1 + (var(--column-gap)) * -1 - (var(--margin) * 1));
		}
		@media (min-width: 1024px) {
			margin-left: calc(var(--column-width) * -2 + (var(--column-gap)) * -2 - var(--margin) * 1);
		}
	}
</style>

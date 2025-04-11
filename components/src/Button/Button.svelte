<script lang="ts">
	interface ButtonProps {
		as: 'button' | 'a';
		label: string;
		href?: string;
		disabled?: boolean;
		onclick?: (e: MouseEvent) => any | void;
	}

	const { as = 'button', label, href, disabled, onclick }: ButtonProps = $props();
</script>

{#if as === 'a'}
	<a class="button" class:disabled {href}>{label}</a>
{:else}
	<button class="button" {onclick} {disabled}>{label}</button>
{/if}

<style lang="scss">
	@use '../styles/base.scss';
	.button {
		@extend %copy-bold;
		background: var(--violet-dark-3);
		display: inline-flex;
		align-items: center;
		justify-self: flex-start;
		padding: 0.25em 1.25em;
		padding-bottom: 0.35em;
		color: white;
		border: 1px solid rgba(white, 0.1);
		box-shadow: 0px 0px 10px rgba(black, 0.05);
		border-radius: var(--br-small);
		text-shadow: 0px 0px 5px rgba(black, 0.05);
		font-size: 1.2rem;
		text-decoration: none;
		@media (min-width: base.$break-tablet) {
			font-size: 1.4rem;
		}
		&:hover,
		&:focus-visible {
			text-decoration: underline;
			text-underline-offset: 0.15em;
		}
		&.disabled,
		&:disabled {
			opacity: 0.5;
		}
	}
</style>

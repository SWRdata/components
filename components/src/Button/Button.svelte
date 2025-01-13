<script lang="ts">
	export let as: string = 'button';
	export let label: string = '';
	export let href: string = '';
	export let disabled: boolean = false;
</script>

{#if as === 'a'}
	<a class="button" class:disabled {href}>{label}</a>
{:else}
	<button class="button" on:click {disabled}>{label}</button>
{/if}

<style lang="scss">
	@import '../styles/base.scss';
	.button {
		@extend %copy-bold;
		background: $color-violet;
		display: inline-flex;
		align-items: center;
		justify-self: flex-start;
		padding: 0.25em 1.25em;
		padding-bottom: 0.35em;
		color: white;
		border: 1px solid rgba(white, 0.1);
		box-shadow: 0px 0px 10px rgba(black, 0.05);
		border-radius: $border-radius-input;
		text-shadow: 0px 0px 5px rgba(black, 0.05);
		font-size: 1.2rem;
		text-decoration: none;
		@include bp($break-tablet) {
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
			/* pointer-events: none; */
		}
	}
</style>

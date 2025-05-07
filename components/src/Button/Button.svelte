<script lang="ts">
	import Copy from '../Copy/Copy.svelte';

	interface ButtonProps {
		label: string;
		as?: 'button' | 'a';
		href?: string;
		disabled?: boolean;
		onclick?: (e: MouseEvent) => any | void;
	}

	const { as = 'button', label, href, disabled, onclick }: ButtonProps = $props();
</script>

{#if as === 'a'}
	<a class="button" class:disabled {href}>
		<Copy weight="bold">
			{label}
		</Copy>
	</a>
{:else}
	<button class="button" {onclick} {disabled}>
		<Copy weight="bold">
			{label}
		</Copy>
	</button>
{/if}

<style lang="scss">
	.button {
		background: var(--violet-dark-3);
		display: inline-flex;
		align-items: center;
		justify-self: flex-start;
		padding: 0.45em 1.25em;
		color: white;
		border: 1px solid rgba(white, 0.1);
		box-shadow: 0px 0px 10px rgba(black, 0.05);
		border-radius: var(--br-small);
		text-shadow: 0px 0px 5px rgba(black, 0.05);
		text-decoration: none;
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

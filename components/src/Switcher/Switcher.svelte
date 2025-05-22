<script lang="ts">
	import FormLabel from '../FormLabel/FormLabel.svelte';

	interface SwitcherProps {
		/**
		 * Human-readable label
		 */
		label: string;
		/**
		 * Available options
		 */
		options: string[];
		/**
		 * Display size
		 */
		size?: 'default' | 'small';
		/**
		 * The currently-selected option
		 */
		value: string | null;
	}

	let { label, options, size = 'default', value = $bindable(null) }: SwitcherProps = $props();

	const groupId = $props.id();
	const groupName = 'select-' + groupId;

	function optionToID(o: string) {
		return `${groupName}-option-${o.replace(/ /g, '-').toLowerCase()}`;
	}
</script>

<fieldset class="container" class:small={size === 'small'}>
	<FormLabel as="legend">{label}</FormLabel>
	<ul>
		{#each options as o (o)}
			<li class:is-selected={o === value}>
				<label for={optionToID(o)}>
					{o}
				</label>
				<input id={optionToID(o)} name={groupName} value={o} type="radio" bind:group={value} />
			</li>
		{/each}
	</ul>
</fieldset>

<style lang="scss">
	@use '../styles/base.scss';

	fieldset {
		border: 0;
		font-family: var(--swr-sans);
	}

	ul {
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding: 0;
		margin: 0;
		border: 1px solid currentColor;
		background: white;
		border-radius: var(--br-small);

		@media (min-width: base.$bp-s) {
			flex-flow: row;
		}

		&:focus-within,
		&:active {
			outline: 2px solid var(--blue-light-2);
		}
	}
	li {
		display: contents;
		&:last-child label {
			border-right: 0;
			border-bottom: 0;
		}
	}
	input {
		position: absolute;
		left: -999px;
	}
	.small label {
		font-size: var(--fs-small-1);
		height: 2.25em;
		padding: 0 0.65em;
	}
	label {
		font-size: var(--fs-base);
		line-height: 1;
		white-space: nowrap;
		padding: 0 1em;
		cursor: pointer;
		margin: 0;
		align-items: center;
		display: flex;
		color: currentColor;
		position: relative;
		transition: var(--fast);
		text-underline-offset: 0.2em;
		border-bottom: 1px solid currentColor;
		height: 2.25em;
		@media (min-width: base.$bp-s) {
			justify-content: center;
			padding: 0 1em;
			flex-basis: 0;
			flex-grow: 1;
			border-right: 1px solid currentColor;
			border-bottom: 0;
		}
		@media (min-width: base.$bp-s) {
			height: 2.5em;
		}
		&:hover,
		&:focus-visible {
			text-decoration: underline;
		}
		.is-selected & {
			background: rgb(247, 247, 247);
			font-weight: 600;
			box-shadow: inset 5px 0px 0 0 var(--violet-dark-5);
			@media (min-width: base.$bp-s) {
				box-shadow: inset 0 -3px 0 0 var(--violet-dark-5);
			}
		}
	}
</style>

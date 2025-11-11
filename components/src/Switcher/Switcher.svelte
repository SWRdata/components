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
		hideLabel?: boolean;
		/**
		 * The currently-selected option (bindable)
		 */
		value: string | null;
		/**
		 * Fired when the selected value changes (Prefer `value` if possible)
		 */
		onchange?: (e: Event) => void;
	}

	let {
		label,
		options,
		size = 'default',
		hideLabel = false,
		value = $bindable(null),
		onchange
	}: SwitcherProps = $props();

	const groupId = $props.id();
	const groupName = 'select-' + groupId;

	function optionToID(o: string) {
		return `${groupName}-option-${o.replace(/ /g, '-').toLowerCase()}`;
	}
</script>

<fieldset class="container" class:small={size === 'small'}>
	<div class="legend" class:hidden={hideLabel}>
		<FormLabel as="legend">{label}</FormLabel>
	</div>
	<ul>
		{#each options as o (o)}
			<li class:is-selected={o === value}>
				<label for={optionToID(o)}>
					{o}
				</label>
				<input
					id={optionToID(o)}
					name={groupName}
					value={o}
					type="radio"
					bind:group={value}
					{onchange}
				/>
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

	.legend {
		&.hidden {
			position: absolute;
			left: -9999px;
		}
	}

	ul {
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding: 0;
		margin: 0;
		border: 1px solid var(--color-textSecondary);
		color: var(--color-textPrimary);
		background: var(--color-surfaceFill);
		border-radius: var(--br-small);

		@media (min-width: base.$bp-s) {
			flex-flow: row;
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
		height: 2em;
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
		text-underline-offset: 0.1em;
		border-right: 1px solid var(--color-textSecondary);
		height: 2.25em;
		@media (min-width: base.$bp-s) {
			justify-content: center;
			padding: 0 1em;
			flex-basis: 0;
			flex-grow: 1;
			border-bottom: 0;
		}
		@media (min-width: base.$bp-s) {
			height: 2.5em;
		}
		&:hover,
		&:focus-visible {
			text-decoration: underline;
			text-decoration-color: var(--color-textSecondary);
		}
		.is-selected & {
			background: var(--color-surfaceHover);
			font-weight: 700;
		}
	}
</style>

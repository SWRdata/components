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
		 * Hide the main label visually
		 */
		hideLabel?: boolean;
		/**
		 * Force the options to be displayed in a row (even on small screens)
		 */
		layout?: 'row' | 'column' | 'auto' = 'auto';
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
		layout = 'auto',
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
	<ul
		class:layout-row={layout === 'row'}
		class:layout-column={layout === 'column'}
		class:layout-auto={layout === 'auto'}
		role="list"
	>
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
		overflow-x: auto;
		padding: 0;
		margin: 0;
		border-top: 1px solid var(--color-textSecondary);
		border-left: 1px solid var(--color-textSecondary);
		color: var(--color-textPrimary);
		background: var(--color-surfaceFill);
		border-radius: var(--br-small);

		@media (min-width: base.$bp-s) {
			flex-flow: row;
		}
		&.layout-row {
			flex-flow: row;
		}
		&.layout-column {
			flex-direction: column;
		}
	}
	li {
		display: contents;
		&:last-child label {
			border-bottom-right-radius: var(--br-small);
		}
		&:first-child label {
			border-top-left-radius: var(--br-small);
		}
	}
	input {
		position: absolute;
		left: -9999px;
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
		margin: 0;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		color: currentColor;
		position: relative;
		transition: var(--fast);
		text-underline-offset: 0.1em;
		height: 2.25em;
		border-right: 1px solid var(--color-textSecondary);
		border-bottom: 1px solid var(--color-textSecondary);
		flex-grow: 1;

		@media (min-width: base.$bp-s) {
			flex-basis: 0;
		}
		.layout-row & {
			flex-basis: 0;
		}
		.layout-column & {
			flex-basis: auto;
		}
		.is-selected & {
			background: var(--color-surfaceHover);
			font-weight: 700;

			@media (prefers-color-scheme: dark) {
				background: var(--gray-dark-2);
			}
		}
		&:hover,
		&:focus-visible {
			text-decoration: underline;
			text-decoration-color: var(--color-textSecondary);
		}
	}
</style>

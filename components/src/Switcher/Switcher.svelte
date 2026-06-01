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
		layout?: 'row' | 'column' | 'auto';
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
		display: inline-flex;
		flex-direction: column;
		margin-top: 0.25em;
		color: var(--color-textPrimary);
		gap: 0;

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
	}
	input {
		position: absolute;
		left: -9999px;
	}

	label {
		font-size: var(--fs-base);
		line-height: 1;
		white-space: nowrap;
		padding: 0 0.75em;
		margin: 0;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		color: currentColor;
		position: relative;
		user-select: none;
		height: 2.15em;
		border: 1px solid var(--color-surfaceBorder);
		background: var(--color-surfaceFill);
		margin-bottom: -1px;

		@media (min-width: base.$bp-s) {
			flex-basis: 0;
			margin-bottom: 0;
			margin-right: -1px;
		}
		&:hover,
		&:focus-visible {
			background: var(--color-surfaceHover);
		}
		.layout-row & {
			flex-basis: 0;
		}
		.layout-column & {
			flex-basis: auto;
			margin-right: 0;
			margin-bottom: -1px;
		}
		.is-selected & {
			transform: scale(1.125);
			border: 1px solid var(--color-textSecondary);
			box-shadow: 0 0 5px 1px var(--color-dropShadow);
			background: var(--color-raisedSurfaceFill);
			z-index: 100;
			font-weight: 600;
			border-radius: 2px;
		}
		.small & {
			font-size: var(--fs-small-1);
			letter-spacing: 0.01em;
			height: 2em;
			padding: 0 0.7em;
			padding-bottom: 0.025em;
			.is-selected & {
				transform: scale(1.1);
			}
		}
	}
</style>

<script lang="ts">
	import Select from 'svelte-select';
	import Fuse from 'fuse.js';
	import { type SelectItem } from './Select.types';

	interface SelectProps {
		/**
		 * The input field's ID. Should be unique across the page.
		 */
		inputId: string;
		/**
		 * The input field's placeholder text
		 */
		placeholder: string;
		/**
		 * The list of select options
		 */
		items: SelectItem[];
		/**
		 * Define custom item groupings. By default items are grouped by their `group` key
		 */
		groupBy?: ((item: SelectItem) => string) | undefined;
		/**
		 * Whether group names should be selectable
		 */
		groupHeaderSelectable?: boolean;
		clearable?: boolean;
		/**
		 * Enable fuzzy matching of the filter text against item labels (powered by Fuse.js).
		 * When disabled (default), items are filtered with a plain case-insensitive substring match.
		 */
		fuzzy?: boolean;
		/**
		 * Fuse.js match tolerance (0 = exact, 1 = match anything). Lower is stricter.
		 * Tune per dataset: short labels usually want a lower value than long, wordy ones.
		 * Only applies when `fuzzy` is enabled.
		 */
		fuzzyThreshold?: number;
		/**
		 * Message shown in the dropdown when no items match the filter.
		 */
		emptyText?: string;
		value: SelectItem | undefined;
	}

	let {
		inputId = 'select',
		placeholder = 'Bitte auswählen',
		items = [],
		groupBy,
		groupHeaderSelectable = false,
		clearable = true,
		fuzzy = false,
		fuzzyThreshold = 0.35,
		emptyText = 'Keine Treffer',
		value = $bindable(undefined)
	}: SelectProps = $props();

	const groupByFn = $derived(groupBy || ((item: SelectItem) => item.group as string));

	// Index is rebuilt only when the option list or threshold changes, not on every keystroke.
	const fuse = $derived(
		fuzzy
			? new Fuse(items, { keys: ['label'], threshold: fuzzyThreshold, ignoreLocation: true })
			: null
	);

	// Replaces svelte-select's default substring matching with Fuse ranking
	// (svelte-select handling of grouping untouched).
	function fuzzyFilter({
		filterText,
		items: filterItems,
		groupBy: groupByKey,
		filterGroupedItems
	}: {
		filterText: string;
		items: SelectItem[];
		groupBy: unknown;
		filterGroupedItems: (items: SelectItem[]) => SelectItem[];
	}) {
		const matched =
			filterText && fuse ? fuse.search(filterText).map((result) => result.item) : filterItems;
		return groupByKey ? filterGroupedItems(matched) : matched;
	}
</script>

<div class="container">
	<Select
		{items}
		groupBy={items.length > 0 && items.every((item) => item.group) ? groupByFn : undefined}
		id={inputId}
		{placeholder}
		{groupHeaderSelectable}
		{clearable}
		filter={fuzzy ? fuzzyFilter : undefined}
		class="container"
		bind:value
	>
		<div class="item" slot="item" let:item>
			<slot name="item" {item}>
				{item.label}
			</slot>
		</div>
		<div class="selection" slot="selection" let:selection>
			<slot name="selection" {selection}>
				{selection.label}
			</slot>
		</div>
		<div class="empty" slot="empty">
			<slot name="empty">
				{emptyText}
			</slot>
		</div>
	</Select>
</div>

<style lang="scss">
	.container {
		font-family: var(--swr-sans);
		// See: https://github.com/rob-balfre/svelte-select/blob/master/docs/theming_variables.md
		--background: var(--color-surfaceFill);
		--list-background: var(--color-surfaceFill);
		--selection-background: var(--color-surfaceFill);
		--item-is-active-bg: var(--color-surfaceBorder);
		--item-is-active-color: var(--color-textPrimary);
		--item-hover-bg: var(--color-surfaceBorder);
		--item-color: var(--color-textPrimary);
		--item-hover-color: var(--color-textPrimary);
		--selected-item-color: var(--color-textPrimary);
	}

	.empty {
		text-align: var(--list-empty-text-align, center);
		padding: var(--list-empty-padding, 20px 0);
		color: var(--list-empty-color, #78848f);
	}
</style>

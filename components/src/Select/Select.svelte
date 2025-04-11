<script lang="ts">
	import Select from 'svelte-select';
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
		value: SelectItem | undefined;
	}

	let {
		inputId = 'select',
		placeholder = 'Bitte auswählen',
		items = [],
		groupBy,
		groupHeaderSelectable = false,
		clearable = true,
		value = $bindable(undefined)
	}: SelectProps = $props();

	const groupByFn = groupBy || ((item: SelectItem) => item.group as string);
</script>

<div class="container">
	<Select
		{items}
		groupBy={items.length > 0 && items.every((item) => item.group) ? groupByFn : undefined}
		id={inputId}
		{placeholder}
		{groupHeaderSelectable}
		{clearable}
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
	</Select>
</div>

<style lang="scss">
	.item {
		font-family: var(--swr-sans);
		color: var(--violet-dark-5);
	}
	.selection {
		font-family: var(--swr-sans);
		color: var(--violet-dark-5);
	}
</style>

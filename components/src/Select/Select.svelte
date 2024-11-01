<script lang="ts">
	import Select from 'svelte-select';

	// FUTURE: is it possible to highlight match in select options?

	/** FIXME:
	 * NOTE: Storybook autodocs are not working for this component
	 * because of the Select import. Set the docs manually instead. */

	/**
	 * The interface for select options
	 */
	interface Option {
		value: string;
		label: string;
		group?: string;
		details?: any;
	}

	/**
	 * The input field's ID
	 */
	export let inputId: string = 'select';

	/**
	 * The input field's placeholder text
	 */
	export let placeholder: string = 'Bitte auswählen';

	/**
	 * The list of select options
	 */
	export let items: Option[] = [];

	let groupBy: ((item: Option) => string) | undefined;
	$: groupBy =
		items.length > 0 && items.every((item) => item.group)
			? (item: Option) => item.group as string
			: undefined;

	/**
	 * Whether the group names should be selectable as well
	 */
	export let groupHeaderSelectable: boolean = false;

	export let value: Option | undefined;
</script>

<!--
This component is a select input with search feature 
and various options such as grouped items, multi-select etc.
based on https://github.com/rob-balfre/svelte-select
@component
-->

<Select {items} {groupBy} id={inputId} {placeholder} {groupHeaderSelectable} bind:value>
	<svelte:fragment slot="item" let:item>
		<slot name="item" {item}>
			{item.label}
		</slot>
	</svelte:fragment>
	<svelte:fragment slot="selection" let:selection>
		<slot name="selection" {selection}>
			{selection.label}
		</slot>
	</svelte:fragment>
</Select>

<style lang="scss">
	@import '../styles/base.scss';

	// TODO: styling (font etc.)
	// .svelte-select, .svelte-select-list {
	//     @extend %copy;
	// }
	// 	--border: 3px solid blue;
	// 	--border-radius: 10px;
	// 	--placeholder-color: blue;
</style>

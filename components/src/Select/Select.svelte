<script lang="ts">
    import Select from 'svelte-select';

    // FUTURE: is it possible to highlight match in select options?

    /** FIXME:
     * NOTE: Storybook autodocs are not working for this component 
     * because of the Select import. Set the docs manually instead. */

    /**
     * The interface for select options
     */
    interface SelectItem {
        value: string;
        label: string;
        group?: string;
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
    export let items: SelectItem[] = [];

    $: items, console.log(items);

    let groupBy: ((item: SelectItem) => string) | undefined;
    $: groupBy = items.length > 0 && items.every(item => item.group)
        ? (item: SelectItem) => item.group as string
        : undefined;

    /**
     * Whether the group names should be selectable as well
     */
    export let groupHeaderSelectable: boolean = false;

    let selectedItem: SelectItem | undefined;
    // $: selectedItem: console.log("Selected item: ", selectedItem);
</script>

<!--
This component is a select input with search feature 
and various options such as grouped items, multi-select etc.
based on https://github.com/rob-balfre/svelte-select
@component
-->

<Select 
    items={items} 
    groupBy={groupBy} 
    id={inputId} 
    placeholder={placeholder} 
    groupHeaderSelectable={groupHeaderSelectable}
    bind:value={selectedItem}
></Select>

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

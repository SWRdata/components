<script>
  import { clickOutside } from '../../events/clickOutside';
  import { createEventDispatcher } from 'svelte';
  import isSvelteComponent from '../../utils/isSvelteComponent';
  import Circle from '../../assets/icons/times-circle-solid.svg.svelte';

  export let data = [];
  
  // The placeholder text for the input field
  export let query = '';

  // The placeholder text for the input field
  export let placeholder = 'Platzhalter';
  export let inputClass = '';
  export let listClass = '';
  export let labelClass = '';

  let input;
  const dispatch = createEventDispatcher();
  let shownItems = data.sort((a, b) => a.value.localeCompare(b.value)).slice(0, 250);
  let highlightedItemIndex = -1;
  let open = false;

  // display max 250 items in dropdown; otherwise dropdown is lagging
  // on weaker devices
  const setShownItems = (d) => (shownItems = d.slice(0, 250));

  // open dropdown if input is clicked
  const handleClick = () => {
    open = true;
    input.select();
  };

  // close dropdown if clicked outside
  const handleClickOutside = () => {
    open = false;
  };

  // insert clicked item into search input, dispatch it as select event
  // and close dropdown
  // function is also used by handleKeyDown function
  const handleItemClick = (index) => {
    const item = shownItems[index];
    query = item.value;
    dispatch('select', {
      item
    });
    open = false;
    input.blur();
  };

  // Use dropdown with keyboard:
  // Arrow up/down: Move trough dropdown menu
  // Enter: Trigger selection
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' && highlightedItemIndex <= shownItems.length - 1) {
      highlightedItemIndex += 1;
    } else if (e.key === 'ArrowUp' && highlightedItemIndex > -1) {
      highlightedItemIndex === 0
        ? (highlightedItemIndex = shownItems.length - 1)
        : (highlightedItemIndex -= 1);
    } else if (e.key === 'Enter') {
      handleItemClick(highlightedItemIndex);
    }
  };

  const handleRemove = (e) => {
    query = '';
    dispatch('select', {
      item: undefined
    });
    open = false;
    setShownItems(data);
  };

  // update dropdown list if input value changes
  const filterCountries = () => {
    let filtered;
    const lowerCasedQuery = query?.toLowerCase();
    if (!lowerCasedQuery || lowerCasedQuery.length === 0) {
      filtered = data;
    } else {
      const lowerCasedData = data.map((d) => {
        d.lowerCasedValue = d.value.toLowerCase();
        return d;
      });
      let filteredData = lowerCasedData.filter((d) =>
        d.lowerCasedValue.toLowerCase().startsWith(lowerCasedQuery)
      );
      if (!filteredData) {
        filteredData = lowerCasedData.filter((d) => {
          d.lowerCasedValue.includes(lowerCasedQuery);
        });
      }
      filtered = filteredData;
    }
    highlightedItemIndex = -1;
    setShownItems(filtered.sort((a, b) => a.value.localeCompare(b.value)));
  };
</script>

<!--
  This component is used to display a list of suggestions for a given query. If an item
  is clicked or an enter key is pressed, the selected item will be returned by an
  custom select event.
  
  Props:
  - **data** *array* The list of possible suggestions to display. For the expected format, scroll down.
  - **query** *string* The current value of the input.
  - **placeholder** *string* The placeholder text for the input field.
  - **inputClass** *string* The class applied to the input field.
  - **listClass** *string* The class applied to the list container.
  - **labelClass** *string* The class applied to the labels.
  
  Events:
  - **select** *function* The event that is triggered when an item is selected.
  
  Data should be provided as array of objects. Each object contains the information for a dropdown entry:
  - **value** *string* the text that is displayed in the input. Has to be unique!
  - **label** *string* | *svelte component* | *array of svelte component and props object* text, html or component displayed in the dropdown list
  - **details** *object* extra data needed by selection handler
  @component
-->

<svelte:window on:keydown={handleKeyDown} />

<div class="container" use:clickOutside on:clickOutside={handleClickOutside}>
  <input
    type="text"
    class={`${inputClass} ${open ? 'open' : 'close'}`}
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    {placeholder}
    bind:this={input}
    bind:value={query}
    on:input={filterCountries}
    on:click={handleClick}
  />
  {#if open && shownItems.length}
    <ul class={listClass}>
      {#each shownItems as item, i (item.value)}
        <li
          class={labelClass}
          on:mouseover={() => (highlightedItemIndex = i)}
          on:focus={() => (highlightedItemIndex = i)}
          on:click={() => {
            handleItemClick(i);
          }}
          data-active={i === highlightedItemIndex}
        >
          {#if isSvelteComponent(item.label)}
            <svelte:component this={item.label} />
          {:else if Array.isArray(item.label) && isSvelteComponent(item.label[0]) && item.label[1] instanceof Object}
            <svelte:component this={item.label[0]} {...item.label[1]} />
          {:else}
            {@html item.label}
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
  {#if query.length}
    <div on:click={handleRemove} class="icon">
      <Circle />
    </div>
  {/if}
</div>

<style lang="scss">
  @import '../../styles/scss/base.scss';

  .container {
    position: relative;
    display: block;
    color: black;
    input {
      border: 1px solid black;
      border-radius: $border-radius-input;
      background: transparent;
      padding: 0 0.75em;
      height: $input-height;
      display: block;
      outline-offset: 2px;
      text-size-adjust: none;
      width: 100%;
      &:focus-visible {
        outline: 2px solid gray;
      }
      &.open {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    ul {
      position: absolute;
      top: 100%;
      border: 1px solid gray;
      border-bottom-left-radius: $border-radius-input;
      border-bottom-right-radius: $border-radius-input;
      border-top: 0;
      left: 0;
      right: 0;
      max-height: 10rem;
      background: white;
      overflow-y: scroll;
      z-index: 1000;

      li {
        padding: 0.5em;
        border-bottom: 1px solid gray;
        cursor: pointer;
        &[data-active='true'] {
          text-decoration: underline;
        }

        &:last-child {
          padding-bottom: 0.3rem;
          border-bottom: 0;
        }
      }
    }

    .icon {
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      right: 0.5rem;
      width: 1rem;
      height: 1rem;

      &:hover,
      &:focus-visible {
        color: red;
        cursor: pointer;
      }
    }
  }
</style>

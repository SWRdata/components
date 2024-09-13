<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Circle from '../../assets/icons/times-circle-solid.svg.svelte';

  export let data = [];
  export let query = '';
  export let placeholder = 'Platzhalter';

  let listRef;
  const dispatch = createEventDispatcher();

  let shownItems = data.sort((a, b) => a.value.localeCompare(b.value)).slice(0, 250);
  let highlightedItemIndex = -1;
  $: isActive = false;

  // display max 250 items in dropdown
  const setShownItems = (d) => (shownItems = d.slice(0, 250));

  // Insert clicked item into search input,
  // dispatch it as select event and close the dropdown
  const handleItemClick = (index) => {
    highlightedItemIndex = index;
    setSelectedItem(shownItems[highlightedItemIndex]);
  };

  const setSelectedItem = (item) => {
    if (!item) return;
    query = item.value;
    dispatch('select', { item });
  };

  // Register keyboard events
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightedItemIndex =
        highlightedItemIndex < shownItems.length - 1 ? highlightedItemIndex + 1 : 0;
      const target = listRef.querySelector(`ul li:nth-child(${highlightedItemIndex + 1})`);
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedItemIndex =
        highlightedItemIndex > 0 ? highlightedItemIndex - 1 : shownItems.length - 1;
      const target = listRef.querySelector(`ul li:nth-child(${highlightedItemIndex + 1})`);
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (e.key === 'Enter') {
      setSelectedItem(shownItems[highlightedItemIndex]);
      isActive = false;
    }
  };

  const handleRemove = (e) => {
    query = '';
    setShownItems(data);
    dispatch('select', {
      item: undefined
    });
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
This component is used to display a list of suggestions for a given query. If an item is clicked or the enter key is pressed, the selected item will be returned by a custom select event.

Data should be provided as array of objects. Each object contains the information for a dropdown entry:
    - **value** *string* the text that is displayed in the input. Has to be unique!
    - **label** *string* | *svelte component* | *array of svelte component and props object* text, html or component displayed in the dropdown list
    - **details** *object* extra data needed by selection handler
@component
-->

<div class="autocomplete" on:keydown={handleKeyDown}>
  <input
    type="text"
    {placeholder}
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    data-testid="autocomplete-input"
    bind:value={query}
    on:input={filterCountries}
    on:focus={() => {
      isActive = true;
    }}
    on:blur={() => {
      window.setTimeout(() => {
        isActive = false;
      }, 100);
    }}
  />

  <ul tabindex="-1" bind:this={listRef} class:active={isActive}>
    {#each shownItems as item, i (item.value)}
      <li>
        <button
          class={`item ${i === highlightedItemIndex ? 'active' : ''}`}
          tabindex="-1"
          type="button"
          on:click={(e) => {
            e.preventDefault();
            handleItemClick(i);
          }}
        >
          {item.label}
        </button>
      </li>
    {/each}
  </ul>
  <button type="button" on:click={handleRemove} class="clear" class:active={query.length > 0}>
    <Circle />
  </button>
</div>

<style lang="scss">
  @import '../../styles/scss/base.scss';

  .autocomplete {
    position: relative;
    display: block;
    color: white;

    input {
      @extend %copy;
      border: 1px solid black;
      border-radius: $border-radius-input;
      background: transparent;
      padding: 0 0.5em;
      height: $input-height;
      margin: 0;
      display: block;
      width: 100%;
      &:focus-visible {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    input[type='text'] {
      text-size-adjust: none;
    }

    ul {
      position: absolute;
      top: 100%;
      border: 1px solid black;
      border-bottom-left-radius: $border-radius-input;
      border-bottom-right-radius: $border-radius-input;
      border-top: 0;
      left: 0;
      right: 0;
      max-height: 10rem;
      overflow-y: scroll;
      z-index: 1000;
      opacity: 0;
      transition: 100ms;
      pointer-events: none;
      &:empty {
        box-shadow: none;
      }
      &.active {
        opacity: 1;
        pointer-events: all;
      }

      .item {
        @extend %caption;
        padding: 0.5em;
        width: 100%;
        background: transparent;
        border: 0;
        text-align: left;
        border-bottom: 1px solid rgba(black, 0.1);
        cursor: pointer;
        &.active, &:hover {
          text-decoration: underline;
        }
      }
    }

    .clear {
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      right: 0.75rem;
      width: 1.2rem;
      height: 1.2rem;
      background: transparent;
      border: 0;
      color: white;
      display: none;
      &.active {
        display: block;
      }
      &:hover,
      &:focus {
        color: $orange--1;
        cursor: pointer;
      }
    }
  }
</style>

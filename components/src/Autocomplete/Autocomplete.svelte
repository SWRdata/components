<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Circle from '../assets/times-circle-solid.svg.svelte';

	export let data = [];
	export let query: string = '';
	export let placeholder: string = 'Platzhalter';
	export let label: string;
	export let name: string;

	const sortData = (a, b) => {
		return a.value.localeCompare(b.value);
	};

	let listRef;
	let inputRef;
	let controlsRef;
	const dispatch = createEventDispatcher();
	const maxSuggestions = 100;

	let highlightedItemIndex = -1;
	$: suggestions = data.sort(sortData).slice(0, maxSuggestions);
	$: isActive = false;

	// Insert clicked item into search input,
	// dispatch it as select event and close the dropdown
	const handleItemClick = (index) => {
		highlightedItemIndex = index;
		setSelectedItem(suggestions[highlightedItemIndex]);
	};

	const setSelectedItem = (item) => {
		query = item.value;
		isActive = false;
		dispatch('select', { item });
	};

	// Register keyboard events
	const handleKeyDown = (e) => {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			highlightedItemIndex =
				highlightedItemIndex < suggestions.length - 1 ? highlightedItemIndex + 1 : 0;
			const target = listRef.querySelector(`ul li:nth-child(${highlightedItemIndex + 1})`);
			target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			highlightedItemIndex =
				highlightedItemIndex > 0 ? highlightedItemIndex - 1 : suggestions.length - 1;
			const target = listRef.querySelector(`ul li:nth-child(${highlightedItemIndex + 1})`);
			target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		} else if (e.key === 'Enter') {
			if (highlightedItemIndex > -1) {
				setSelectedItem(suggestions[highlightedItemIndex]);
				isActive = false;
			}
		}
	};

	const handleClear = () => {
		query = '';
		inputRef.focus();
		setSuggestions();
		dispatch('select', {
			item: null
		});
	};

	const setSuggestions = () => {
		suggestions = data
			.filter((el) => {
				return el.value.toLowerCase().startsWith(query.toLowerCase());
			})
			.slice(0, maxSuggestions)
			.sort(sortData);
	};

	// update dropdown list if input value changes
	const handleInput = () => {
		isActive = true;
		if (query.length === 0) {
			suggestions = data;
		} else {
			setSuggestions();
			highlightedItemIndex = -1;
		}
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

<div class="autocomplete" class:active={isActive}>
	<label for={name}>{label}</label>
	<input
		type="text"
		{name}
		{placeholder}
		autocomplete="off"
		autocorrect="off"
		autocapitalize="off"
		data-testid="autocomplete-input"
		bind:this={inputRef}
		on:keydown={handleKeyDown}
		bind:value={query}
		on:input={handleInput}
		on:focus={() => {
			isActive = true;
		}}
		on:blur={(e) => {
			if (listRef.contains(e.relatedTarget)) {
				window.setTimeout(() => {
					isActive = false;
				}, 100);
			} else if (!controlsRef.contains(e.relatedTarget)) {
				isActive = false;
			}
		}}
	/>

	<ul tabindex="-1" bind:this={listRef}>
		{#each suggestions as item, i (item.value)}
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
	<div class="controls" bind:this={controlsRef}>
		<button type="button" on:click={handleClear} class="clear" class:active={query.length > 0}>
			<Circle />
		</button>
	</div>
</div>

<style lang="scss">
	@import '../styles/base.scss';

	.autocomplete {
		position: relative;
		display: block;
		color: white;

		label {
			@extend %form-label;
		}

		input {
			@extend %form-input;
		}

		ul {
			position: absolute;
			top: 100%;
			border: 1px solid currentColor;
			background: $reanimation-violetblue;
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

			.item {
				@extend %caption;
				padding: 0.5em;
				width: 100%;
				background: transparent;
				border: 0;
				text-align: left;
				color: currentColor;
				border-bottom: 1px solid rgba(white, 0.25);
				cursor: pointer;
				&.active,
				&:hover {
					text-decoration: underline;
					background-color: rgba(white, 0.05);
				}
			}
		}

		.clear {
			position: absolute;
			top: 50%;
			right: 0.75rem;
			width: 1.2rem;
			height: 1.2rem;
			background: transparent;
			border: 0;
			display: none;
			color: white;
			&.active {
				display: block;
			}
			&:hover,
			&:focus {
				color: $orange;
				cursor: pointer;
			}
		}
		&.active {
			ul {
				opacity: 1;
				pointer-events: all;
			}
			input {
				border-bottom-right-radius: 0;
				border-bottom-left-radius: 0;
			}
		}
	}
</style>

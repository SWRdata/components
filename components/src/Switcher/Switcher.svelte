<script lang="ts">
	export let label: string = '';

	// The options available in the switcher.
	export let options: string[] = [];

	// Machine-readable name for the form field. Should be unique to other fields in the form.
	export let groupName: string = '';

	// The currently selected option
	export let value: string = options[0];

	function optionToID(o: string) {
		// TODO: This should use $id() when it comes out, so
		// input IDs are guaranteed unique across the app
		// See: https://github.com/sveltejs/svelte/issues/13108
		return `${groupName}-option-${o.replace(/ /g, '-').toLowerCase()}`;
	}
</script>

<!--
Radio-like form component to choose exactly one of a given set of options.
@component
-->

<fieldset class="container">
	<legend>{label}</legend>
	<ul>
		{#each options as o (o)}
			<li class:is-selected={o === value}>
				<label for={optionToID(o)}>
					{o}
					<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M19.7054 6.29119C20.0969 6.68077 20.0984 7.31393 19.7088 7.7054L9.75697 17.7054C9.56928 17.894 9.31416 18 9.04809 18C8.78201 18 8.52691 17.8939 8.33925 17.7053L4.2911 13.6365C3.90157 13.245 3.90318 12.6118 4.2947 12.2223C4.68621 11.8327 5.31938 11.8344 5.7089 12.2259L9.04825 15.5823L18.2912 6.2946C18.6808 5.90314 19.3139 5.90161 19.7054 6.29119Z"
							fill="currentColor"
						/>
					</svg>
				</label>
				<input id={optionToID(o)} name={groupName} value={o} type="radio" bind:group={value} />
			</li>
		{/each}
	</ul>
</fieldset>

<style lang="scss">
	@import '../styles/base.scss';

	fieldset {
		border: 0;
	}

	legend {
		@extend %form-label;
	}

	ul {
		width: 100%;
		display: flex;
		flex-direction: row;
		border-radius: $border-radius-input;
		overflow: hidden;
		padding: 0;
		margin: 0;
		overflow: hidden;
		border: 1px solid currentColor;

		&:focus-within,
		&:active {
			outline: 3px solid rgba(white, 0.5);
		}
	}
	li {
		display: contents;
		&:last-child label {
			border-right: 0;
		}
	}
	input {
		position: absolute;
		left: -999px;
	}
	label {
		@extend %copy;
		line-height: 1;
		height: $input-height;
		cursor: pointer;
		margin: 0;
		flex-basis: 0;
		flex-grow: 1;
		align-items: center;
		display: flex;
		justify-content: center;
		color: currentColor;
		position: relative;
		transition: $transition-fast;
		text-underline-offset: 0.1em;
		border-right: 1px solid currentColor;
		&:hover,
		&:focus-visible {
			text-decoration: underline;
		}
		svg {
			position: absolute;
			left: 0.65em;
			width: 1em;
			height: auto;
			opacity: 0;
			transition: $transition-fast;
			display: block;
		}
		.is-selected & {
			background: white;
			color: black;
			svg {
				opacity: 1;
			}
		}
	}
</style>

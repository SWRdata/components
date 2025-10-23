<script lang="ts">
	interface GridInspectorProps {
		target: HTMLElement | undefined;
	}

	const { target }: GridInspectorProps = $props();
	let cols = $derived.by(() => {
		if (!target) return [];
		return window.getComputedStyle(target).gridTemplateColumns.split(' ');
	});
</script>

<div class="container">
	{#each cols as c}
		<i class="col" style:width={c}></i>
	{/each}
</div>

<style>
	.container {
		display: flex;
		justify-content: space-between;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		opacity: 0.1;
		pointer-events: none;
		z-index: 0;
	}
	.col {
		background: rgb(104, 120, 179);
		flex-grow: 0;
		&:first-child {
			border-left: 0;
		}
		&:last-child {
			border-right: 0;
		}
	}
</style>

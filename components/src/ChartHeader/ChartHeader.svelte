<script>
	import DesignTokens from '../DesignTokens/DesignTokens.svelte';

	export let title = '';
	export let subtitle = '';
</script>

<DesignTokens>
	<header class="container">
		<h2 class="title">{title}</h2>
		<p class="subtitle">{subtitle}</p>
		<slot />
	</header>
</DesignTokens>

<style lang="scss">
	@use '../styles/vars.scss';

	.container {
		color: var(--violet-blue);
		font-family: var(--swr-sans);
	}
	.title {
		font-size: var(--fs-large-3);
		line-height: 1.05;
		text-wrap: balance;
		font-weight: 700;
		margin-bottom: 0.2em;
	}
	.subtitle {
		text-wrap: balance;
		margin-bottom: 0.25em;
		font-size: var(--fs-large-1);
		&:last-child {
			margin-bottom: 0;
		}
	}
</style>

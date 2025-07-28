<script>
	let { children } = $props();
</script>

<ul class="sharing-buttons">Teilen</ul>
<div class="container">
	<div class="embed">
		{@render children()}
	</div>
</div>

<style lang="scss">
	@font-face {
		font-family: 'SWR-VAR-Sans';
		font-weight: 400 600 700;
		font-display: swap;
		src: url('https://www.swr.de/assets/fonts/swr_type/SWR_VAR_WEB/SWR-VAR-Sans.woff2')
			format('woff2');
	}
	@font-face {
		font-family: 'SWR-VAR-Text';
		font-weight: 400 600 700;
		font-display: swap;
		src: url('https://www.swr.de/assets/fonts/swr_type/SWR_VAR_WEB/SWR-VAR-Text.woff2')
			format('woff2');
	}
	.container {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		max-width: 510px;
		margin: 0 auto;

		@media (min-width: 768px) {
			max-width: 750px;
		}
		@media (min-width: 1200px) {
			max-width: 813px;
		}
	}
	.embed {
		width: 100%;
	}
	.sharing-buttons {
		border: 1px solid red;
		padding: 0.25em;
		color: red;
		position: fixed;
		width: 57px;
		height: calc(216px + 48px);
		z-index: 1000;
		left: 162px;
		top: 64px;
	}
</style>

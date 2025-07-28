<script>
	import HeroScrolly from '$lib/HeroScrolly.svelte';
	import { dev } from '$app/environment';
	import { Copy } from '@swr-data-lab/components';
	import DevContainer from '$lib/components/DevContainer.svelte';
</script>

{#if dev}
	<DevContainer>
		<Copy>
			<p class="placeholder">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus voluptates itaque at, iste
				assumenda quam obcaecati labore impedit quaerat magni. Cupiditate maxime placeat mollitia
				inventore aperiam modi nostrum dicta quia ea, libero voluptas at sed, vitae sequi? Amet, ex
				quis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus voluptates itaque
				at, iste assumenda quam obcaecati labore impedit quaerat magni. Cupiditate maxime placeat
				mollitia inventore aperiam modi nostrum dicta quia ea, libero voluptas at sed, vitae sequi?
				Amet, ex quis?
			</p>
			<p class="placeholder">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus voluptates itaque at, iste
				assumenda quam obcaecati labore impedit quaerat magni. Cupiditate maxime placeat mollitia
				inventore aperiam modi nostrum dicta quia ea, libero voluptas at sed, vitae sequi? Amet, ex
				quis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus voluptates itaque
				at, iste assumenda quam obcaecati labore impedit quaerat magni. Cupiditate maxime placeat
				mollitia inventore aperiam modi nostrum dicta quia ea, libero voluptas at sed, vitae sequi?
				Amet, ex quis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus voluptates
				itaque at, iste assumenda quam obcaecati labore impedit quaerat magni. Cupiditate maxime
				placeat mollitia inventore aperiam modi nostrum dicta quia ea, libero voluptas at sed, vitae
				sequi? Amet, ex quis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
				voluptates itaque at, iste assumenda quam obcaecati labore impedit quaerat magni. Cupiditate
				maxime placeat mollitia
			</p>
		</Copy>

		<HeroScrolly />
		<Copy>
			<p class="placeholder">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus voluptates itaque at, iste
				assumenda quam obcaecati labore impedit quaerat magni. Cupiditate maxime placeat mollitia
				inventore aperiam modi nostrum dicta quia ea, libero voluptas at sed, vitae sequi? Amet, ex
				quis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus voluptates itaque
				at, iste assumenda quam obcaecati labore impedit quaerat magni. Cupiditate maxime placeat
				mollitia inventore aperiam modi nostrum dicta quia ea, libero voluptas at sed, vitae sequi?
				Amet, ex quis?
			</p>
			<p class="placeholder">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus voluptates itaque at, iste
				assumenda quam obcaecati labore impedit quaerat magni. Cupiditate maxime placeat mollitia
				inventore aperiam modi nostrum dicta quia ea, libero voluptas at sed, vitae sequi? Amet, ex
				quis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus voluptates itaque
				at, iste assumenda quam obcaecati labore impedit quaerat magni. Cupiditate maxime placeat
				mollitia inventore aperiam modi nostrum dicta quia ea, libero voluptas at sed, vitae sequi?
				Amet, ex quis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus voluptates
				itaque at, iste assumenda quam obcaecati labore impedit quaerat magni. Cupiditate maxime
				placeat mollitia inventore aperiam modi nostrum dicta quia ea, libero voluptas at sed, vitae
				sequi? Amet, ex quis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
				voluptates itaque at, iste assumenda quam obcaecati labore impedit quaerat magni. Cupiditate
				maxime placeat mollitia
			</p>
			<p class="placeholder">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus voluptates itaque at, iste
				assumenda quam obcaecati labore impedit quaerat magni. Cupiditate maxime placeat mollitia
				inventore aperiam modi nostrum dicta quia ea, libero voluptas at sed, vitae sequi? Amet, ex
				quis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus voluptates itaque
				at, iste assumenda quam obcaecati labore impedit quaerat magni. Cupiditate maxime placeat
				mollitia inventore aperiam modi nostrum dicta quia ea, libero voluptas at sed, vitae sequi?
				Amet, ex quis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus voluptates
				itaque at, iste assumenda quam obcaecati labore impedit quaerat magni. Cupiditate maxime
				placeat mollitia inventore aperiam modi nostrum dicta quia ea, libero voluptas at sed, vitae
				sequi? Amet, ex quis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
				voluptates itaque at, iste assumenda quam obcaecati labore impedit quaerat magni. Cupiditate
				maxime placeat mollitia
			</p>
		</Copy>
	</DevContainer>
{:else}
	<p118-hero-scrolly></p118-hero-scrolly>
{/if}

<style>
	.placeholder {
		background: rgb(238, 238, 238);
		padding: 1rem;
		font-size: 1.4rem;
		margin: 2rem 0;
	}
</style>

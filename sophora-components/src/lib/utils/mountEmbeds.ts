import { mount } from 'svelte';
import type { SvelteComponent } from 'svelte';

declare global {
	interface Window {
		$?: unknown;
	}
}

export default async function mountEmbeds(
	Component: typeof SvelteComponent,
	targetSelector: string
): Promise<void> {
	const _mountEmbeds = () =>
		(() => {
			const embedTargets = document.querySelectorAll(targetSelector);
			embedTargets.forEach((target, index) => {
				console.log(`>>> Mounting embed #${index} for target:`, target);
				mount(Component, { target });
			});
		})();

	// Mount the embeds on initial page load
	_mountEmbeds();

	// SWR.dev uses PJAX and jQuery for client-side navigation, which replaces page content without a full reload.
	// This means we need to re-mount the Svelte components after PJAX updates the DOM during client-side navigation.
	// https://github.com/defunkt/jquery-pjax?tab=readme-ov-file#reinitializing-pluginswidget-on-new-page-content
	if (window.$) {
		$(document).on('pjax:end', () => {
			// Delay to ensure new DOM is ready for mounting.
			// PJAX triggers 'pjax:end' before the mounting targets are actually available in the DOM.
			setTimeout(() => _mountEmbeds(), 500);
		});
	}
}

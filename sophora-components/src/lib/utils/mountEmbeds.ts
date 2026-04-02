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
	const _mountEmbeds = (embedTargets: NodeListOf<Element>) => {
		embedTargets.forEach((target) => {
			target.innerHTML = ''; // Clear any existing content before mounting
			mount(Component, { target });
		});
	};

	// Mount the embeds on initial page load
	_mountEmbeds(document.querySelectorAll(targetSelector));

	// SWR.dev uses PJAX and jQuery for client-side navigation, which replaces page content without a full reload.
	// This means we need to re-mount the Svelte components after PJAX updates the DOM during client-side navigation.
	// https://github.com/defunkt/jquery-pjax?tab=readme-ov-file#reinitializing-pluginswidget-on-new-page-content
	if (window.$) {
		$(document).on('pjax:end', () => {
			let pollCount = 0;
			const maxPolls = 10;
			const pollInterval = 200; // ms

			// Delay to ensure new DOM is ready for mounting.
			// PJAX triggers 'pjax:end' before the mounting targets are actually available in the DOM.
			const interval = window.setInterval(() => {
				pollCount++;
				const embedTargets = document.querySelectorAll(targetSelector);
				if (!embedTargets.length) return;
				if (embedTargets.length > 0) {
					_mountEmbeds(embedTargets);
					window.clearInterval(interval);
					console.log(`Mounting embeds succeeded after ${pollCount} polls.`);
				}
				if (pollCount > maxPolls) {
					window.clearInterval(interval);
					console.log(`Mounting embeds failed: targets not found after ${maxPolls} attempts.`);
				}
			}, pollInterval);
		});
	}
}

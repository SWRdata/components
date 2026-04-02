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
			console.log(
				`Mounting components for selector: ${targetSelector}`,
				document.querySelectorAll(targetSelector)
			);
			document.querySelectorAll(targetSelector).forEach((target) => {
				console.log(`Mounting individual component on target:`, target);
				mount(Component, { target });
			});
		})();

	// Mount the components on initial load
	console.log('Mounting Datawrapper Switcher on initial load');
	_mountEmbeds();

	// Listen for PJAX navigation events to remount the component if needed
	if (window.$) {
		$(document).on('pjax:end', () => {
			// Delay to ensure new DOM is ready before attempting to mount
			setTimeout(() => _mountEmbeds(), 500);
		});
	}
}

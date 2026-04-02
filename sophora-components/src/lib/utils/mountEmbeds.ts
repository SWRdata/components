import { mount } from 'svelte';
import type { SvelteComponent } from 'svelte';

export default async function mountEmbeds(
	Component: typeof SvelteComponent,
	targetSelector: string
): Promise<void> {
	const _mountEmbeds = () => {
		console.log(
			`Mounting components for selector: ${targetSelector}`,
			document.querySelectorAll(targetSelector)
		);
		document.querySelectorAll(targetSelector).forEach((target) => {
			console.log(`Mounting individual component on target:`, target);
			mount(Component, { target });
		});
	};

	// Listen for PJAX navigation events to remount the component if needed
	if (window.$) {
		$(document).on('pjax:end', () => {
			console.log('PJAX navigation detected (jQuery), remounting Datawrapper Switcher');
			_mountEmbeds();
		});
	}

	// Mount the components on initial load
	console.log('Mounting Datawrapper Switcher on initial load');
	_mountEmbeds();
}

import { mount } from 'svelte';

type ComponentConstructor = new (...args: any[]) => any;

export async function mountEmbed(
	componentName: string,
	Component: ComponentConstructor
): Promise<void> {
	const selector = `[data-lab-components-embed="${componentName}"]`;
	document.querySelectorAll(selector).forEach((target) => {
		mount(Component, { target });
	});
}

import { mount } from 'svelte';

type ComponentConstructor = new (...args: any[]) => any;

export default async function mountEmbed(
	target: Element,
	Component: ComponentConstructor
): Promise<void> {
	mount(Component, { target });
}

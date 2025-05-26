import { SvelteComponent } from 'svelte';

/**
 * Check if given component is a svelte component.
 * @param {*} component
 * @returns {boolean}
 */

const isSvelteComponent = (component) => {
	return SvelteComponent.isPrototypeOf(component) || typeof component === 'function';
};

export default isSvelteComponent;

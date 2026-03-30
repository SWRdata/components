import { mount } from 'svelte';
import IndexPage from './index.svelte';

mount(IndexPage, {
	target: document.querySelector('[data-lab-components-embed="swr-sophora-components"]')!
});

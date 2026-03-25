import { mount } from 'svelte';
import IndexPage from '../pages/IndexPage.svelte';

mount(IndexPage, {
	target: document.querySelector('[data-lab-components-embed="swr-sophora-components"]')!
});

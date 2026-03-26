import { mount } from 'svelte';
import HighlightCardsPage from '../pages/HighlightCardsPage.svelte';

document
	.querySelectorAll('[data-lab-components-embed="swr-sophora-components-highlight-cards"]')
	.forEach((target) => {
		mount(HighlightCardsPage, { target });
	});

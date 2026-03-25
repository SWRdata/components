import { mount } from 'svelte';
import HighlightCardsPage from '../pages/HighlightCardsPage.svelte';

mount(HighlightCardsPage, {
	target: document.querySelector(
		'[data-lab-components-embed="swr-sophora-components-highlight-cards"]'
	)!
});

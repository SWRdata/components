import { mount } from 'svelte';
import DatawrapperSwitcherPage from '../pages/DatawrapperSwitcherPage.svelte';

mount(DatawrapperSwitcherPage, {
	target: document.querySelector(
		'[data-lab-components-embed="swr-sophora-components-datawrapper-switcher"]'
	)!
});

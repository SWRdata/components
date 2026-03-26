import { mount } from 'svelte';
import DatawrapperSwitcherPage from '../pages/DatawrapperSwitcherPage.svelte';

document
	.querySelectorAll('[data-lab-components-embed="swr-sophora-components-datawrapper-switcher"]')
	.forEach((target) => {
		mount(DatawrapperSwitcherPage, { target });
	});

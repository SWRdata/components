import { mount } from 'svelte';
import DatawrapperSwitcherPage from './index.svelte';

document
	.querySelectorAll('[data-lab-components-embed="swr-sophora-components-datawrapper-switcher"]')
	.forEach((target) => {
		mount(DatawrapperSwitcherPage, { target });
	});

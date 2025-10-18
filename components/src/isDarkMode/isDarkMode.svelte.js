import { MediaQuery } from 'svelte/reactivity';

const dm = new MediaQuery('prefers-color-scheme: dark', false);
export default () => {
	return dm.current;
};

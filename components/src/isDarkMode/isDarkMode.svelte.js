import { MediaQuery } from 'svelte/reactivity';
import { readable } from 'svelte/store';

const dm = new MediaQuery('prefers-color-scheme: dark', false);
const isDarkMode = readable(dm.current);
export default isDarkMode;

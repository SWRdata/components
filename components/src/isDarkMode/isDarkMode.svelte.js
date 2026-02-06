import { MediaQuery } from 'svelte/reactivity';

const dm = new MediaQuery('prefers-color-scheme: dark', false);

// Create a reactive state for dark mode
let isDark = $state(false);

// Initialize and observe body class changes
if (typeof document !== 'undefined') {
	const checkDarkMode = () => {
		if (document.body?.classList.contains('dark')) {
			return true;
		}
		if (document.body?.classList.contains('light')) {
			return false;
		}
		return dm.current;
	};

	isDark = checkDarkMode();

	const observer = new MutationObserver(() => {
		isDark = checkDarkMode();
	});

	observer.observe(document.body, {
		attributes: true,
		attributeFilter: ['class']
	});
} else {
	isDark = dm.current;
}

export default () => isDark;

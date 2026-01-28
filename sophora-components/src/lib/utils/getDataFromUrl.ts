export default function getData(target: HTMLElement): Record<string, string> {
	let url: URL;
	if (
		// SvelteKit DEV mode, preview server, or static hosting:
		import.meta.env.DEV ||
		window.location.origin === 'http://localhost:4173' ||
		window.location.origin === 'https://static.datenhub.net' ||
		window.location.href.includes('apidata.googleusercontent.com') ||
		window.location.href.includes('storage.googleapis.com')
	) {
		// Preview mode – use URL of current page
		url = new URL(window.location.href);
	} else {
		// Embedded mode – use URL used to embed the component
		// `data-url` is set on the grandparent element, provided by Sophora
		const parent = target.parentNode?.parentNode as HTMLElement | null;
		url = new URL(parent?.dataset.url || '');
	}
	const params: Record<string, string> = Object.fromEntries(url.searchParams);
	return params;
}

export default function getDataFromUrl(target: HTMLElement): Record<string, string> {
	const parent = target.parentNode?.parentNode as HTMLElement | null;

	// Default: Embedded mode – use URL used to embed the component
	// `data-url` is the embeds the grandparent element, provided by Sophora
	let embedURL = parent?.dataset.url;

	if (!embedURL) {
		// Preview mode – use URL of current page
		embedURL = window?.location.href;
	}

	return URL.canParse(embedURL)
		? Object.fromEntries(new URL(embedURL).searchParams.entries())
		: (console.error('Could not parse Embed-URL:', embedURL), {});
}

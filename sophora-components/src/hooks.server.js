/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const routeID = event.route.id ? event.route.id.replace('/', '') : false;
	const containerID = `swr-sophora-components${routeID ? '-' + routeID : ''}`;
	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			html
				.replace(`id="data-lab-components-embed"`, `data-lab-components-embed="${containerID}"`)
				.replace(
					'document.currentScript.parentElement',
					'document.currentScript.closest("[data-lab-components-embed]")'
				)
	});
	return response;
}

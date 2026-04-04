/** @type {import('@sveltejs/kit').Handle} */

export async function handle({ event, resolve }) {
	const embedId = 'swrdata-p139-embed';

	const routeID = event.route.id ? event.route.id.replace('/', '') : false;
	const containerID = `${embedId}${routeID ? '-' + routeID : ''}`;

	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			html
				.replace(`id="swrdata-p139-embed"`, `id="${containerID}"`)
				.replace(
					'document.currentScript.parentElement',
					`document.querySelector("#${containerID}")`
				)
	});

	return response;
}

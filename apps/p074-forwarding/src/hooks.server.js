/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace(
				'document.currentScript.parentElement',
				'document.querySelector("#swrdata-p047_embed")'
			)
	});

	return response;
}

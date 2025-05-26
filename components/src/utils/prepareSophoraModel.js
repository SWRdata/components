const SELECTORS = {
	showScrollUp: 'a.back-to-top',
	showPlayerbar: '#playerbar',
	showSharing: '.sharing',
	showAuthors: '.meta-top .meta-authors',
	allowZoom: 'meta[name=viewport]'
};

const IS_MOBILE = window.innerWidth < 768;

const prepareSophoraModel = (config) => {
	console.log('###SWRDATA### updating dom with following config: ', config);
	Object.entries(config).forEach(([k, v], _) => {
		const element = document.querySelector(SELECTORS[k]);
		// show/hide elements
		if (k.startsWith('show')) {
			if (
				(v === 'none' || (v === 'mobile' && IS_MOBILE) || (v === 'desktop' && !IS_MOBILE)) &&
				element
			) {
				element.style.display = 'none';
				element.style.visibility = 'hidden';
			}
		}
		// enable/disable zoom
		if (k === 'allowZoom') {
			if (!v && element) {
				element.setAttribute(
					'content',
					'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
				);
			}
		}
	});
};

export default prepareSophoraModel;

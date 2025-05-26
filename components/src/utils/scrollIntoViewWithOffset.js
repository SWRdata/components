const OFFSET = -50;

/**
 * Scroll to top of given dom element with given offset.
 * @param {object} ref to dom element
 * @param {number} offset
 */
const scrollIntoViewWithOffset = (ref, offset) => {
	const yOffset = offset !== 'undefined' ? offset : OFFSET;
	const y = ref.getBoundingClientRect().top + window.pageYOffset + yOffset;
	window.scrollTo({ top: y, behavior: 'smooth' });
};

export default scrollIntoViewWithOffset;

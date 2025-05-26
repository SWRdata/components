import { formatLocale } from 'd3-format';

export const defaultFormat = ',.1f';
export const defaultLocale = {
	decimal: ',',
	thousands: ' ',
	grouping: [3],
	currency: ['', '€']
};

export default formatNumber = ({ number, format = defaultFormat, locale = defaultLocale }) => {
	return formatLocale(locale).format(format)(number);
};

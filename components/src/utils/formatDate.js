import { timeFormat } from 'd3-time-format';

const formats = {
	dayMonthYear: '%-d.%-m.%Y',
	dayMonth: '%-d.%-m.',
	dayMonthYearShort: '%-d.%-m.%y',
	dayMonthHourMinute: '%-d.%-m., %-H.%M Uhr',
	dayMonthYearHourMinute: '%-d.%-m.%Y, %-H.%M Uhr',
	hourMinuteSophora: '%-H:%M Uhr',
	hourMinute: '%-H.%M'
};

const formatDate = ({ date, format = 'dayMonthYear' }) => {
	return timeFormat(formats[format] || format)(new Date(date));
};

export default formatDate;

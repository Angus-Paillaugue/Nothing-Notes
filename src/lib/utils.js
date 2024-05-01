/**
 * Formats a date using the specified options.
 *
 * @param {Date} date - The date to format.
 * @param {Object} options - The formatting options.
 * @param {string} [options.dateStyle='long'] - The date style.
 * @param {string} [options.timeStyle='medium'] - The time style.
 * @param {string} [options.locale='en'] - The locale.
 * @returns {string} The formatted date string.
 */
export function formatDate(date, { dateStyle = 'long', timeStyle = 'medium', locale = 'en' }) {
	const dateFormatter = new Intl.DateTimeFormat(locale, {
		dateStyle: dateStyle,
		timeStyle: timeStyle
	});
	return dateFormatter.format(date);
}

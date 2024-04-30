/**
 * Formats a given date using the specified date style and locale.
 * @param {Date} date - The date to format.
 * @param {string} [dateStyle='medium'] - The style of the date. Defaults to 'medium'.
 * @param {string} [locales='en'] - The locale to use for formatting. Defaults to 'en'.
 * @returns {string} The formatted date.
 */
export function formatDate(
	date,
	opts = { dateStyle: 'medium', timeStyle: 'short', locales: 'en' }
) {
	// Safari is mad about dashes in the date
	const dateFormatter = new Intl.DateTimeFormat(opts.locales, opts);
	return dateFormatter.format(date);
}

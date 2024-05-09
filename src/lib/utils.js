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

/**
 * Checks if a URL starts with a given path.
 *
 * @param {string} url - The URL to check.
 * @param {string|string[]} path - The path or an array of paths to compare with the URL.
 * @returns {boolean} Returns true if the URL starts with the path(s), otherwise returns false.
 */
export function urlStartsWith(url, path) {
	if (!url || !path) return false;
	if (path instanceof Array) return path.some((p) => urlStartsWith(url, p));
	// For the `/` path
	if (path.length === 1) return url.at(-1) === path;

	return url.startsWith(path) || url.startsWith(path + '/');
}

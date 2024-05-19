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
export function formatDate(date, { dateStyle = 'long', timeStyle = 'short', locale = 'en' }) {
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

/**
 * Checks if the given email is valid.
 *
 * @param {string} email - The email to be validated.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export function isEmailValid(email) {
	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
	return emailRegex.test(email);
}

/**
 * Creates an accordion effect on the specified node.
 * @param {HTMLElement} node - The HTML element to apply the accordion effect to.
 * @param {boolean} isOpen - Specifies whether the accordion is initially open or closed.
 * @returns {Object} - An object with an `update` method to control the accordion state.
 */
export function accordion(node, isOpen) {
	let initialHeight = node.offsetHeight;
	node.style.height = isOpen ? 'auto' : 0;
	node.style.overflow = 'hidden';
	return {
		update(isOpen) {
			let animation = node.animate(
				[
					{
						height: initialHeight + 'px',
						overflow: 'hidden'
					},
					{
						height: 0,
						overflow: 'hidden'
					}
				],
				{ duration: 150, fill: 'both' }
			);
			animation.pause();
			if (!isOpen) {
				animation.play();
			} else {
				animation.reverse();
			}
		}
	};
}

import { readFileSync, writeFileSync } from 'fs';

const translateTo = ['fr', 'es', 'ar'];
const baseForTranslationLocale = 'en';

// Main function to translate the base JSON to all locales
(async () => {
	const base = JSON.parse(
		readFileSync(`./src/lib/locales/${baseForTranslationLocale}.json`, 'utf-8')
	);

	for (const locale of translateTo) {
		console.log(`Translating to ${locale}.`);
		const translatedJSON = await translateJSON(base, locale);
		console.log(`DONE ! Translating to ${locale}.`);
		writeFileSync(`./src/lib/locales/${locale}.json`, JSON.stringify(translatedJSON, null, 2));
	}

	console.log('\nAll translations complete.\n');
})();

/**
 * Translates a JSON object to the specified target locale.
 *
 * @param {Object} baseJSON - The base JSON object to be translated.
 * @param {string} targetLocale - The target locale for translation.
 * @returns {Promise<Object>} - A promise that resolves to the translated JSON object.
 */
async function translateJSON(baseJSON, targetLocale) {
	// Helper function to recursively traverse the JSON object
	async function traverse(obj) {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (typeof obj[key] === 'string') {
					// Translate the string using the provided translation function
					obj[key] = await translate(obj[key], targetLocale);
				} else if (typeof obj[key] === 'object') {
					// Recursively traverse nested objects
					await traverse(obj[key]);
				}
			}
		}
	}
	await traverse(baseJSON);

	return baseJSON;
}

/**
 * Translates the given text to the specified locale.
 * @param {string} text - The text to be translated.
 * @param {string} locale - The target locale for translation.
 * @returns {Promise<string>} - The translated text.
 */
async function translate(text, locale) {
	const res = await fetch('http://localhost:5000/translate', {
		method: 'POST',
		body: JSON.stringify({
			q: text,
			source: baseForTranslationLocale,
			target: locale,
			format: 'text',
			api_key: ''
		}),
		headers: { 'Content-Type': 'application/json' }
	});
	const data = (await res.json()).translatedText;

	return data;
}

import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'en-US';

register('en', () => import('../locales/en.json'));
register('fr', () => import('../locales/fr.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale,
	handleMissingMessage: (key) => {
		return key.id.split('.').pop();
	}
});

import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';
import { STATUS } from '$lib/constants';
import { urlStartsWith } from '$lib/utils';

const protectedUrls = [
	'/note',
];

export const handle = async ({ event, resolve }) => {
	const { url, cookies, locals, request } = event;

	const lang = request.headers.get('accept-language')?.split(',')[0];
	if (lang) locale.set(lang);

	const token = cookies.get('token') || false;
	try {
		if (token) {
			const user = await auth(token);

			if (user) {
				locals.user = user;
			} else {
				cookies.delete('token', { path: '/' });
			}
		} else {
			locals.user = false;
		}
	} catch (error) {
		console.log(error);
		locals.user = false;
	}

	if (url.pathname === '/' && locals.user) {
		throw redirect(STATUS.REDIRECT, '/note');
	}

	if (url.pathname === '/note' && !locals.user) {
		cookies.delete('token', { path: '/' });
		throw redirect(STATUS.REDIRECT, '/log-in');
	}

	if ((url.pathname.startsWith('/log-in') || url.pathname.startsWith('/sign-up')) && locals.user) {
		throw redirect(STATUS.REDIRECT, '/note');
	}

	const response = await resolve(event);
	response.headers.set(
		'X-Robots-Tag',
		urlStartsWith(url.pathname, protectedUrls) ? 'noindex, nofollow' : 'index, follow'
	);

	return response;
};

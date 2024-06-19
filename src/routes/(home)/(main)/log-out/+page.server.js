import { redirect } from '@sveltejs/kit';
import { STATUS } from '$lib/constants';

/** @type {import('./$types').PageLoad} */
export async function load({ cookies, locals }) {
	locals.user = undefined;
	cookies.delete('token', { path: '/' });

	throw redirect(STATUS.REDIRECT, '/log-in');
}

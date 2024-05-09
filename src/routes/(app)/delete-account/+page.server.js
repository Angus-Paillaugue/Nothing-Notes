import { redirect } from '@sveltejs/kit';
import { STATUS } from '$lib/constants';
import { usersRef, notesRef } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const { user } = locals;

	return { user };
}

/** @type {import('./$types').Actions} */
export const actions = {
	deleteAccount: async ({ locals }) => {
		const { user } = locals;

		await notesRef.deleteMany({ owner: user.username });
		await usersRef.deleteOne({ username: user.username });

		throw redirect(STATUS.REDIRECT, '/log-out');
	}
};

import { notesRef } from '$lib/server/db';
import { error, redirect, fail } from '@sveltejs/kit';
import { STATUS } from '$lib/constants';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const { id } = params;
	const { user } = locals;

	const note = await notesRef.findOne({ id }, { projection: { _id: 0 } });

	if (!note) error(404, 'noteNotFound');

	const isOwner = user?.username === note.owner;
	if (!isOwner && !note.public) error(403, 'notePrivate');

	return { id, note, isOwner };
}

/** @type {import('./$types').Actions} */
export const actions = {
	duplicateNote: async ({ params }) => {
		const { id } = params;
		const note = await notesRef.findOne({ id }, { projection: { _id: 0 } });
		if (!note)
			return fail(STATUS.SERVER_ERROR, {
				error: 'note.duplicate.error',
				action: 'duplicateNote'
			});

		note.id = crypto.randomUUID();

		await notesRef.insertOne(note);

		throw redirect(STATUS.REDIRECT, `/note/${note.id}`);
	},
	deleteNote: async ({ params }) => {
		const { id } = params;

		try {
			await notesRef.deleteOne({ id });
		} catch (error) {
			return fail(STATUS.SERVER_ERROR, {
				error: 'note.modals.delete.error',
				action: 'deleteNote'
			});
		}

		throw redirect(STATUS.REDIRECT, '/note');
	}
};

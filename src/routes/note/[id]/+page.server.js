import { notesRef } from '$lib/server/db';
import { error, redirect, fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const { id } = params;
	const { user } = locals;

	const note = await notesRef.findOne({ id, owner: user.username }, { projection: { _id: 0 } });

	if (!note) error(404, 'Note not found');

	return { id, note };
}

/** @type {import('./$types').Actions} */
export const actions = {
	duplicateNote: async ({ params }) => {
		const { id } = params;
		const note = await notesRef.findOne({ id }, { projection: { _id: 0 } });
		if (!note)
			return fail(422, {
				error: 'note.duplicate.error',
				action: 'duplicateNote'
			});

		note.id = crypto.randomUUID();

		await notesRef.insertOne(note);

		throw redirect(303, `/note/${note.id}`);
	},
	deleteNote: async ({ params }) => {
		const { id } = params;

		try {
			await notesRef.deleteOne({ id });
		} catch (error) {
			return fail(422, {
				error: 'note.modals.delete.error',
				action: 'deleteNote'
			});
		}

		throw redirect(303, '/note');
	}
};

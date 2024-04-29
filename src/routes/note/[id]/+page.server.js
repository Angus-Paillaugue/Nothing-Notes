import { notesRef } from '$lib/server/db';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
  const { id } = params;
  const { user } = locals;

  const note = await notesRef.findOne({ id, owner: user.username }, { projection: { _id: 0 } });

	if (!note) error(404, 'Note not found');

  return { id, note };
}

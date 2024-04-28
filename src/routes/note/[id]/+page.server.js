import { notesRef } from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { id } = params;

  const note = (await notesRef.findOne({ id }, { projection: { _id: 0 } })) ?? {
		title: '',
		content: '',
		id
	};

  return { id, note };
}

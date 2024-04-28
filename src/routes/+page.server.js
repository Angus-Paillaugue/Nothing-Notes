import { notesRef } from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const notes = await notesRef.find().project({ _id:0 }).toArray();
  
	return { notes  };
}

import { notesRef } from '$lib/server/db';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { id } = await request.json();

	await notesRef.deleteOne({ id });

	return new Response('OK');
}

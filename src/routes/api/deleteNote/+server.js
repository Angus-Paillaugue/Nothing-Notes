import { notesRef } from '$lib/server/db';
import { STATUS } from '$lib/constants';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { id } = await request.json();

	await notesRef.deleteOne({ id });

	return new Response('OK', { status: STATUS.OK });
}

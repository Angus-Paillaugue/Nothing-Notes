import { notesRef } from '$lib/server/db';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { id, content, title, color, archived } = await request.json();

	let setObj = {};
	if (content !== undefined) setObj.content = content;
	if (title !== undefined) setObj.title = title;
	if (color !== undefined) setObj.color = color;
	if (archived !== undefined) setObj.archived = archived;
	console.log(setObj);

	await notesRef.updateOne(
		{ id },
		{ $set: { ...setObj, lastModified: new Date() } },
		{ upsert: true }
	);

	return new Response('OK');
}

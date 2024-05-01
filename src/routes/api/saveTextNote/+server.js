import { notesRef } from '$lib/server/db';
import { auth } from '$lib/server/auth';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
	const { id, content, title, color, archived, pinned } = await request.json();
	const token = cookies.get('token');

	if (!id) return new Response('Missing ID', { status: 400 });

	try {
		const user = await auth(token);
		if (!user) return new Response('Unauthorized', { status: 401 });

		let setObj = {};
		if (content !== undefined) setObj.content = content;
		if (title !== undefined) setObj.title = title;
		if (color !== undefined) setObj.color = color;
		if (archived !== undefined) setObj.archived = archived;
		if (pinned !== undefined) setObj.pinned = pinned;

		await notesRef.updateOne(
			{ id, owner: user.username },
			{ $set: { ...setObj, lastModified: new Date() } },
			{ upsert: true }
		);
	} catch (error) {
		return new Response(`Unauthorized (${error.error})`, { status: 401 });
	}

	return new Response('OK');
}

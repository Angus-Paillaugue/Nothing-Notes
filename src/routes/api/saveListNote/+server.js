import { notesRef } from '$lib/server/db';
import { auth } from '$lib/server/auth';
import { STATUS } from '$lib/constants';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
	const { id, items, title, color, archived, pinned } = await request.json();
	const token = cookies.get('token');

	try {
		const user = await auth(token);
		if (!id) return new Response('Missing ID', { status: STATUS.CLIENT_ERROR });
		if (!user) return new Response('Unauthorized', { status: STATUS.CLIENT_ERROR });

		let setObj = {};
		if (items !== undefined) setObj.items = items;
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
		return new Response(`Unauthorized (${error.error})`, { status: STATUS.CLIENT_ERROR });
	}

	return new Response('OK', { status: STATUS.OK });
}

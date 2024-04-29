import { notesRef } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const { user } = locals;

	const notes = await notesRef.find({ owner: user.username }).sort({ lastModified:-1 }).project({ _id:0 }).toArray();

	return { notes };
}

/** @type {import('./$types').Actions} */
export const actions = {
	async createTextualNote({ locals }) {
		const { user } = locals;
		const uuid = crypto.randomUUID();

		await notesRef.insertOne({
			id: uuid,
			type: 'text',
			content: '',
			title: '',
			owner: user.username,
			lastModified: new Date()
		});

		throw redirect(303, `/note/${uuid}`);
	},
	async createListNote({ locals }) {
		const { user } = locals;
		const uuid = crypto.randomUUID();

		await notesRef.insertOne({
			id: uuid,
			type: 'list',
			items: [
				{
					content: '',
					checked: false,
					id: crypto.randomUUID()
				}
			],
			title: '',
			owner: user.username,
			lastModified: new Date()
		});

		throw redirect(303, `/note/${uuid}`);
	}
};

import { isEmailValid } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import { usersRef } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (!locals.user) throw redirect(301, '/log-in');
	const { user } = locals;

	return { user };
}

/** @type {import('./$types').Actions} */
export const actions = {
	changeEmail: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		const { email } = formData;
		try {
			if (!email || !isEmailValid(email)) {
				return {
					message: 'accountSettings.errors.invalidEmail',
					type: 'emailChange',
					email,
					success: false
				};
			}
			await usersRef.updateOne({ email: locals.user.email }, { $set: { email } });
			return {
				message: 'accountSettings.errors.emailChangeSuccess',
				type: 'emailChange',
				email,
				success: true
			};
		} catch (error) {
			return {
				message: error,
				success: false,
				text: 'raw',
				email,
				type: 'emailChange'
			};
		}
	},
	changeProfilePicture: async ({ request, locals }) => {
		try {
			const formData = Object.fromEntries(await request.formData());
			const { profilePicture } = formData;
			if (!profilePicture.size === 0)
				return {
					message: 'settings.profilePictureChange.noImage',
					type: 'profilePictureChange',
					success: false
				};

			const res = await locals.pb.collection('users').update(locals.user.id, { profilePicture });
			return {
				message: 'settings.profilePictureChange.success',
				type: 'profilePictureChange',
				success: true,
				newImage: { collectionId: res.collectionId, id: res.id, image: res.profilePicture }
			};
		} catch (error) {
			return {
				message:
					Object.values(error?.response?.data ?? '')
						.map((el) => el.message)
						.join('<br>') || 'settings.error',
				success: false,
				text: 'raw',
				type: 'profilePictureChange'
			};
		}
	}
};

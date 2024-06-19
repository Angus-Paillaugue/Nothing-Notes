import { fail, error } from '@sveltejs/kit';
import { STATUS } from '$lib/constants';
import { usersRef, resetPasswordRef } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { token } = params;

	const resetPasswordDoc = await resetPasswordRef.findOne({ token });
	if (!resetPasswordDoc)
		throw error(STATUS.CLIENT_ERROR, { message: 'resetPassword.errors.invalidToken' });

	if (new Date() > resetPasswordDoc.expire) {
		throw error(STATUS.CLIENT_ERROR, { message: 'resetPassword.errors.expiredToken' });
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	reset: async ({ request, params }) => {
		try {
			const { token } = params;
			const formData = Object.fromEntries(await request.formData());
			const { password, cpassword } = formData;

			if (password !== cpassword)
				return fail(STATUS.CLIENT_ERROR, { message: 'resetPassword.errors.passwordsDontMatch' });
			if (password.length < 6)
				return fail(STATUS.CLIENT_ERROR, { message: 'resetPassword.errors.passwordTooShort' });

			const resetPasswordDoc = await resetPasswordRef.findOne({ token });
			if (!resetPasswordDoc)
				return fail(STATUS.CLIENT_ERROR, { message: 'resetPassword.errors.expiredToken' });

			await usersRef.updateOne({ email: resetPasswordDoc.email }, { $set: { password } });
			await resetPasswordRef.deleteOne({ token });

			return { success: true, message: 'resetPassword.errors.success' };
		} catch (error) {
			console.log(error);
			return fail(STATUS.CLIENT_ERROR, { message: 'resetPassword.errors.generic' });
		}
	}
};

import { resetPasswordRef } from '$lib/server/db';
import { STATUS } from '$lib/constants';
import { fail } from '@sveltejs/kit';
import { isEmailValid } from '$lib/utils';

export const actions = {
	reset: async ({ request }) => {
		try {
			const formData = Object.fromEntries(await request.formData());
			const { email } = formData;

			if (!isEmailValid(email))
				return fail(STATUS.CLIENT_ERROR, { message: 'forgotPassword.errors.invalidEmail' });

			// Delete all previous reset password requests for this email
			await resetPasswordRef.deleteMany({ email });
			const expirationTime = new Date();
			expirationTime.setMinutes(expirationTime.getMinutes() + 15);
			const token = crypto.randomUUID();
			await resetPasswordRef.insertOne({ email, expire: expirationTime, token });

			return {
				message: 'forgotPassword.errors.sentEmail',
				success: true
			};
		} catch (_) {
			console.log(_);
			return fail(STATUS.CLIENT_ERROR, { message: 'forgotPassword.errors.incorrectCredentials' });
		}
	}
};

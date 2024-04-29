import { usersRef } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_SECRET } from '$env/static/private';

export const actions = {
	default: async ({ cookies, request }) => {
		try {
			const formData = Object.fromEntries(await request.formData());
			const { email, password } = formData;

			const userExists = await usersRef.findOne({ email });
			if (!userExists) return fail(422, { error:'No account with this e-mail!' });
			const compare = await bcrypt.compare(password, userExists.password);
			if (compare) {
				cookies.set('token', generateAccessToken(email), {
					path: '/',
					maxAge: 60 * 60 * 24 * 10,
					secure: false
				});
				throw redirect(303, '/note');
			}
			return fail(422, { error:'Incorrect password!' });
		} catch (err) {
			console.log(err);
		}
	}
};

function generateAccessToken(email) {
	return jwt.sign(email, AUTH_TOKEN_SECRET);
}

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
			const { username, email, password } = formData;

			const emailIsAlreadyUsed = await usersRef.findOne({ email });
			if (emailIsAlreadyUsed)
				return fail(422, { error: 'Already an account associated with this e-mail!' });

			const usernameIsAlreadyUsed = await usersRef.findOne({ username });
			if (usernameIsAlreadyUsed)
				return fail(422, { error: 'Already an account with this username!' });

			if (!/^[a-zA-Z0-9]+$/.test(username))
				return fail(422, { error: 'Usernames can only be composed of letters and numbers!' });

			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			await usersRef.insertOne({ username, email, password: hash });

			cookies.set('token', generateAccessToken(email), {
				path: '/',
				maxAge: 60 * 60 * 24 * 10,
				secure: false
			});

			throw redirect(303, '/note');
		} catch (err) {
			console.log(err);
		}
	}
};

function generateAccessToken(email) {
	return jwt.sign(email, AUTH_TOKEN_SECRET);
}

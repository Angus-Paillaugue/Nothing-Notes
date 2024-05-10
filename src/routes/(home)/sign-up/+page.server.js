import { usersRef } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_SECRET } from '$env/static/private';
import { STATUS } from '$lib/constants';
import { isEmailValid } from '$lib/utils';

export const actions = {
	default: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { username, email, password } = formData;

		const emailIsAlreadyUsed = await usersRef.findOne({ email });
		if (emailIsAlreadyUsed)
			return fail(STATUS.CLIENT_ERROR, { error: 'signUp.form.errors.accountAlreadyExists' });

		const usernameIsAlreadyUsed = await usersRef.findOne({ username });
		if (usernameIsAlreadyUsed)
			return fail(STATUS.CLIENT_ERROR, { error: 'signUp.form.errors.usernameTaken' });

		if (!/^[a-zA-Z0-9]+$/.test(username))
			return fail(STATUS.CLIENT_ERROR, { error: 'signUp.form.errors.invalidUsernameFormat' });

		if (password.length < 6)
			return fail(STATUS.CLIENT_ERROR, { error: 'signUp.form.errors.passwordTooShort' });

		if (!isEmailValid(email))
			return fail(STATUS.CLIENT_ERROR, { error: 'signUp.form.errors.invalidEmail' });

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		await usersRef.insertOne({ username, email, password: hash });

		cookies.set('token', generateAccessToken(email), {
			path: '/',
			maxAge: 60 * 60 * 24 * 10,
			secure: false
		});

		throw redirect(STATUS.REDIRECT, '/note');
	}
};

function generateAccessToken(email) {
	return jwt.sign(email, AUTH_TOKEN_SECRET);
}

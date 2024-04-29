import { usersRef } from './db';
import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_SECRET } from '$env/static/private';

async function auth(token) {
	try {
		return new Promise((resolve, reject) => {
			if (!token) reject({ error: 'jwt must be provided' });
			jwt.verify(token, AUTH_TOKEN_SECRET, async (err, email) => {
				if (err) return reject({ error: err });
				const user = await usersRef.findOne({ email });
				if (!user)
					return reject({
						error: { status: 500, responseText: 'An error occurred while fetching your user data' }
					});
				else resolve((({ password, _id, ...o }) => o)(user));
			});
		}).catch((err) => {
			return { error: err };
		});
	} catch (err) {
		return { error: err };
	}
}

export { auth };

import { usersRef } from './db';
import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_SECRET } from '$env/static/private';

async function auth(token) {

	if (!token) throw new Error('jwt must be provided');
	const email = await jwt.verify(token, AUTH_TOKEN_SECRET);
	if (!email) throw new Error('An error occurred while fetching your user data');

	const user = await usersRef.findOne({ email });

	if (!user){
		throw new Error('An error occurred while fetching your user data');
	}else {
		return (({ password, _id, ...o }) => o)(user);
	}
}

export { auth };

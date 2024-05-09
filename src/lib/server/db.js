import { MongoClient } from 'mongodb';
import { MONGODB_PROD_CONNEXION_STRING, MONGODB_DEV_CONNEXION_STRING } from '$env/static/private';
const { MODE } = import.meta.env;

const mongodbUri =
	MODE === 'development' ? MONGODB_PROD_CONNEXION_STRING : MONGODB_DEV_CONNEXION_STRING;

const client = new MongoClient(mongodbUri);
await client.connect();

const database = client.db('notes');

const notesRef = database.collection('notes');
const usersRef = database.collection('users');
const resetPasswordRef = database.collection('reset-password');

export { notesRef, usersRef, resetPasswordRef };

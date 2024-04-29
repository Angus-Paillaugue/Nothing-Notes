import { MongoClient } from 'mongodb';
import { MONGODB_CONNEXION_STRING } from '$env/static/private';

const client = new MongoClient(MONGODB_CONNEXION_STRING);
await client.connect();

const database = client.db('notes');

const notesRef = database.collection('notes');
const usersRef = database.collection('users');

export { notesRef, usersRef };

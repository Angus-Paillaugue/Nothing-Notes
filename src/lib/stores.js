import { writable } from 'svelte/store';

/**
 * Represents the SEO store.
 * @type {import('svelte/store').Writable<{ title: string, description: string }>}
 */
export const seo = writable({ title: '', description: '' });

import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		csp: {
			mode: 'hash',
			directives: { 'script-src': ['self'] }
		},
		csrf: {
			checkOrigin: true
		}
	},
	preprocess: vitePreprocess()
};
export default config;

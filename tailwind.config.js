/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				bg: '#000000',
				red: '#D71921',
				gray: '#1b1d1f',
				white: '#f0f2f2'
			},
			fontFamily: {
				dot: 'Ndot-55',
				base: 'Lettera Mono LL'
			},
			borderRadius: {
				DEFAULT: '0.5rem'
			}
		}
	},
	plugins: []
};

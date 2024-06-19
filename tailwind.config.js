/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				red: '#d71921',
				gray: '#1b1d1f',
				white: '#f0f2f2',
				blue: '#249688'
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

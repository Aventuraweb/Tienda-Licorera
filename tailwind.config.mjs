/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
        'red-400': '#f56565',
        'red-500': '#e53e3e',
        'blue-400': '#63b3ed',
        'blue-500': '#3182ce',
        'green-400': '#68d391',
        'green-500': '#48bb78',
        'goldenYellow': '#FFBA05',
        },
	},
	plugins: [],
}
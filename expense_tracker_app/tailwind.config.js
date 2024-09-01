/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		screens: {
			mobile: "430px",
			tablet: "640px",
			laptop: "1024px",
			desktop: "1280px",
		},
	},
	plugins: [],
}

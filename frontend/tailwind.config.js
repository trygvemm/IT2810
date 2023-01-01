/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: ["night"],
		theme: {
			extend: {
				screens: {
					sm: "600px",
					// => @media (min-width: 992px) { ... }
				},
			},
		},
	},
	plugins: [require("daisyui")],
};

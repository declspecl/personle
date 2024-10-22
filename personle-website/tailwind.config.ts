import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const { sans: defaultSans, serif: defaultSerif } = defaultTheme.fontFamily;

export default {
	content: ["./src/**/*.tsx"],
	theme: {
		screens: {
			sm: "40rem",
			md: "48rem",
			lg: "64rem",
			xl: "80rem",
			"2xl": "96rem"
		},
		colors: {
			white: "hsl(var(--white))",
			black: "hsl(var(--black))",
			red: {
				DEFAULT: "hsl(var(--red))",
				dark: "hsl(var(--red-dark))"
			},
			yellow: {
				DEFAULT: "hsl(var(--yellow))",
				white: "hsl(var(--yellow-white))"
			},
			grey: {
				dark: "hsl(var(--grey-dark))",
				light: "hsl(var(--grey-light))"
			},
			blue: {
				dark: "hsl(var(--blue-dark))",
				matte: "hsl(var(--blue-matte))",
				light: "hsl(var(--blue-light))"
			},
			transparent: "transparent"
		},
		extend: {
			fontFamily: {
				cooper: ["Cooper", ...defaultSans],
				earwig: ["Earwig Factory", ...defaultSans],
				expose: ["Expose", ...defaultSerif],
				times: ["Times New Roman", ...defaultSerif],
				arsenal: ["Arsenal", ...defaultSans]
			}
		}
	},
	plugins: []
} satisfies Config;

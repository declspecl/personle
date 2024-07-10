import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        screens: {
            "sm": "40rem",
            "md": "48rem",
            "lg": "64rem",
            "xl": "80rem",
            "2xl": "96rem"
        },
        colors: {
            white: "hsl(var(--white))",
            black: "hsl(var(--black))",
            red: "hsl(var(--red))",
            transparent: "transparent"
        },
        extend: {
            fontFamily: {
                cooper: ["Cooper", "sans-serif"],
                earwig: ["Earwig Factory", "sans-serif"],
                expose: ["Expose", "serif"],
                times: ["Times New Roman", "serif"],
                arsenal: ["Arsenal", "sans-serif"]
            }
        }
    },
    plugins: []
} satisfies Config;

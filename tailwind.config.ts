import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        colors: {
            white: "hsl(var(--white))",
            black: "hsl(var(--black))",
            red: "hsl(var(--red))",
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

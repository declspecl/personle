import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                cooper: ["Cooper", "sans-serif"],
                earwig: ["Earwig Factory", "sans-serif"],
                expose: ["Expose", "serif"],
                times: ["Times New Roman", "serif"]
            }
        }
    },
    plugins: []
} satisfies Config;

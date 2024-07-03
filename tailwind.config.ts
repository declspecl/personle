import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                cooper: ["Cooper Black", "sans-serif"],
                quilon: ["Quilon", "sans-serif"],
                times: ["Times New Roman", "serif"]
            }
        }
    },
    plugins: []
} satisfies Config;

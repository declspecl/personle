import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@lib": path.resolve(__dirname, "src/lib"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@context": path.resolve(__dirname, "src/context"),
            "@components": path.resolve(__dirname, "src/components"),
            "@ui": path.resolve(__dirname, "src/components/ui")
        }
    },
    server: {
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                secure: false
            }
        }
    },
    plugins: [react()]
});

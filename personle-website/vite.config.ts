import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ViteMinifyPlugin } from "vite-plugin-minify";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					react: ["react", "react-dom", "react-router-dom"],
					gsap: ["gsap", "@gsap/react"]
				}
			}
		}
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@lib": path.resolve(__dirname, "src/lib"),
			"@data": path.resolve(__dirname, "src/data"),
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@context": path.resolve(__dirname, "src/context"),
			"@layouts": path.resolve(__dirname, "src/layouts"),
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
	plugins: [react(), ViteMinifyPlugin()]
});

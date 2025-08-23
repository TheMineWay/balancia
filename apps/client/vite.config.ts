import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import pkg from "./package.json";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		// Router plugin
		tanstackRouter({
			routesDirectory: "./src/routes",
			generatedRouteTree: "./src/routeTree.gen.ts",
			target: "react",
			autoCodeSplitting: true,
		}),
		// PWA config
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: pkg.name,
				description: pkg.description,
				icons: [
					{
						src: "logo-64.png",
						sizes: "64x64",
						type: "image/png",
					},
				],
				shortcuts: [],
			},
		}),
	],
	resolve: {
		alias: {
			"@pkg": path.resolve(__dirname, "package.json"),
			"@core": path.resolve(__dirname, "src/core"),
			"@common": path.resolve(__dirname, "src/common"),
			"@fts": path.resolve(__dirname, "src/features"),
			"@layouts": path.resolve(__dirname, "src/app/layouts"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@public": path.resolve(__dirname, "public"),
			"@providers": path.resolve(__dirname, "src/app/providers"),
			"@constants": path.resolve(__dirname, "src/constants"),
			"@i18n": path.resolve(__dirname, "src/i18n"),
			"@routes": path.resolve(__dirname, "src/routes"),
			"@app": path.resolve(__dirname, "src/app"),
		},
	},
	server: {
		port: 3000,
	},
});

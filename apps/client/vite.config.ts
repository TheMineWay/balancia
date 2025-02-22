import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@pkg": path.resolve(__dirname, "package.json"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@public": path.resolve(__dirname, "public"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@providers": path.resolve(__dirname, "src/providers"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@i18n": path.resolve(__dirname, "src/i18n"),
      "@ts-types": path.resolve(__dirname, "src/types"),
      "@core": path.resolve(__dirname, "src/core"),
    },
  },
  server: {
    port: 3001,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  build: {
    assetsInlineLimit: 0, // Disable inlining of assets (including SVGs)
  },
});

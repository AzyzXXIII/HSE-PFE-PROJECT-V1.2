import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), eslint(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // or whatever port your Express server is on
        changeOrigin: true,
      },
    },
  },
});

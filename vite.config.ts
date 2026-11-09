import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

/**
 * GitHub Pages project sites live under /<repo>/, while a custom domain is
 * served from the root. The base is derived from the repository name and can
 * be overridden with VITE_BASE (useful when a custom domain is configured).
 */
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgPagesRepo = repositoryName.endsWith(".github.io");
const customBase = process.env.VITE_BASE?.trim();

const base =
  customBase || (repositoryName && !isUserOrOrgPagesRepo ? `/${repositoryName}/` : "/");

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["motion", "lucide-react"],
        },
      },
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== "true",
  },
});

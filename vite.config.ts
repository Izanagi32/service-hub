import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";

/**
 * GitHub Pages serves project sites from /<repo>/ but a custom domain (public/CNAME)
 * is served from the domain root. Keep both cases working without touching CI.
 */
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgPagesRepo = repositoryName.endsWith(".github.io");
const hasCustomDomain = existsSync(path.resolve(__dirname, "public/CNAME"));

const base =
  hasCustomDomain || !repositoryName || isUserOrOrgPagesRepo
    ? "/"
    : `/${repositoryName}/`;

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

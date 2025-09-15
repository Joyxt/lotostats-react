import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ⚡ Configuration spéciale pour GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: "/lotostats-react/", // 👈 doit correspondre EXACTEMENT au nom de ton repo GitHub
});

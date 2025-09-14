import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚡ Configuration spéciale GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/lotostats-react/', // doit être EXACTEMENT le nom de ton repo GitHub
})

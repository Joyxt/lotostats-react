import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/lotostats-react/", // ⚡ doit être exactement le nom du dépôt
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/lotostats-react/', // ⚡ doit correspondre au nom exact de ton repo GitHub
})

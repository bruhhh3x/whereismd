import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT:
// If your GitHub repo is named something else,
// change '/access-initiation/' below to '/YOUR-REPO-NAME/'
export default defineConfig({
  plugins: [react()],
  base: '/access-initiation/',
})

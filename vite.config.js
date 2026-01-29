import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you deploy under a subpath (e.g. GitHub Pages project),
// set base to '/your-repo-name/'.
export default defineConfig({
  plugins: [react()],
  // base: '/access-initiation/', 
})

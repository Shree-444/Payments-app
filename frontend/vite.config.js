import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
},
{
  server: {
    watch: {
      usePolling: true, // Enables hot reload in some cases
    },
    hmr: {
      overlay: false, // Prevents full-page refresh on error
    },
  },
})

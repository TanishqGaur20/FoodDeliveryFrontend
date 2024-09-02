import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // use the environment variable PORT if available, otherwise default to 3000
    host: '0.0.0.0', // ensure it binds to all network interfaces
  },
})
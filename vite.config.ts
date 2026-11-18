import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api/v1': {
        target: 'http://localhost:7000',
        changeOrigin: true,
      },
      '/auth': {
        target: 'http://localhost:7000',
        changeOrigin: true,
      },
    },
  },
})

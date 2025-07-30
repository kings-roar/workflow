import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/skliquiditycalc": {
        target: "https://dftuat.sharekhan.com", // Backend server URL
        changeOrigin: true,
        
      },
      "/api-creds": {
        target: "http://localhost:9459", // Backend server URL
        changeOrigin: true,
        
      },
    },
  },
})

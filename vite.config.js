import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/skliquiditycalc": {
        target: "https://dftuatweb.sharekhan.com", // Backend server URL
        changeOrigin: true,
        
      },
      "/autoflow/v1": {
        target: "http://10.11.26.199:9459", // Backend server URL //  10.11.26.199:9459/autoflow/v1/api-creds
        changeOrigin: true,
      },
    },
  },
})

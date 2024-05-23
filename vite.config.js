import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true // For making sure that the PWA is testable from the Local dev environment
      },
      registerType: 'autoUpdate',
      manifest: {
        name: "SportBuzz application",
        short_name: "SportBuzz",
        icons: [
          {
            "src": "/public/stadium.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
          },
          {
            "src": "/public/stadium.ico",
            "type": "image/png",
            "sizes": "16x16"
          },
          {
            "src": "/public/stadium.ico",
            "type": "image/png",
            "sizes": "32x32"
          },
          {
            "src": "/public/stadium.ico",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "/public/stadium.ico",
            "type": "image/png",
            "sizes": "512x512",
            "purpose": "any maskable" // Icon format that ensures that your PWA icon looks great on all Android devices
          }
        ],
        theme_color: '#AAF',
      },
    }),
  ],
  esbuild: {
    target: 'es2020', // or 'esnext', 'es2022', etc.
  },
})

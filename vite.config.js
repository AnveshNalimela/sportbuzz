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
            "src": "/stadium.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
          },
          {
            "src": "/favicon-16x16.png",
            "type": "image/png",
            "sizes": "16x16"
          },
          {
            "src": "/favicon-32x32.png",
            "type": "image/png",
            "sizes": "32x32"
          },
          {
            "src": "/pwa-192x192.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "/pwa-512x512.png",
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
    target: 'esnext', // or 'esnext', 'es2022', etc.
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setupTests.ts',
    coverage: {
      provider: 'c8', // or 'istanbul' if you prefer
      reporter: ['text', 'html'], // Choose the reporters you want
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['node_modules/', '__tests__/'],
    },
  },
  server: {
    port: 5175,  // Change this to your desired port
  },
});




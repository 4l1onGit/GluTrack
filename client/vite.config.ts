
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { manifest } from './manifest';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(
    {
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: manifest, 
      injectRegister: 'auto'
    }
    )],
  test: {
    globals: true,
    environment: 'jsdom',
  }
})

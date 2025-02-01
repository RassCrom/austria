import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@hooks': path.resolve('src/hooks'),
      '@components': path.resolve('src/components'),
      '@utils': path.resolve('src/utils'),
      '@store': path.resolve('src/store'),
      '@': path.resolve('src/components'),
      '@pages': path.resolve('src/pages'),
    },
  },
})

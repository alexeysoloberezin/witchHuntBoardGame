import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/vue/',
  plugins: [vue()],
  // server: {
  //   port: 3000
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Укажите путь к вашей папке src
    },
  },
})

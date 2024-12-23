import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import VueJSX from '@vitejs/plugin-vue-jsx';
import Checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/vue/',
  plugins: [vue(), VueJSX(), Checker({ typescript: true })],
  // server: {
  //   port: 3000
  // },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3333",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/socket.io": {
        target: "ws://localhost:3333",
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Укажите путь к вашей папке src
    },
  },
  test: {
    global: true,
    environment: "happy-dom"
  }
})

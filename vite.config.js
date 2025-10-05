import { defineConfig } from 'vite';

export default defineConfig({
  // ---> AÑADE ESTA LÍNEA AQUÍ
  root: '.', 
  // <--- FIN LÍNEA AÑADIDA
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
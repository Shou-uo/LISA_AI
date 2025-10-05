import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Solo necesitamos el plugin de React para compilar JSX
  plugins: [react()], 
});

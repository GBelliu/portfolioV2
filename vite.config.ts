import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // a cena 3D (three.js) é carregada sob demanda durante o loader
    chunkSizeWarningLimit: 1100,
  },
});

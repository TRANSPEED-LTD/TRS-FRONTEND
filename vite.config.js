import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'scss': path.resolve(__dirname, 'src/assets/scss'),
      'images': path.resolve(__dirname, 'src/assets/images'),
      'fonts': path.resolve(__dirname, 'src/assets/fonts'),
      'utils': path.resolve(__dirname, 'src/utils'), 
      'layout': path.resolve(__dirname, 'src/Components/layout') 
    }
  }
});

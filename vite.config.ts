import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Other alias configurations if needed
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
    },
  },
  css: {
    postcss: './postcss.config.js', // Ensure PostCSS config is used
  },
  build: {
    // Any build-specific configurations if necessary
  },
});

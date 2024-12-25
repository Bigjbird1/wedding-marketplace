/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./client/src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['client/src/**/*.{ts,tsx}'],
      exclude: ['client/src/**/*.test.{ts,tsx}', 'client/src/test/**/*']
    },
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@db': path.resolve(__dirname, './db')
    }
  },
  build: {
    outDir: 'dist/public',
    emptyOutDir: true,
    sourcemap: true
  }
});
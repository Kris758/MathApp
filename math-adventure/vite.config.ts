import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves from https://<user>.github.io/<repo>/
// Set BASE_PATH when building (see deploy workflow), e.g. BASE_PATH=/math-adventure/
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [react()],
});

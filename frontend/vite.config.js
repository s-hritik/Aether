import { defineConfig } from 'vite';
import fs from 'fs';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
  };

  // Only add the HTTPS config when running the dev server
  if (command === 'serve') {
    config.server = {
      https: {
        key: fs.readFileSync('./localhost-key.pem'),
        cert: fs.readFileSync('./localhost.pem'),
      },
    };
  }

  return config;
});
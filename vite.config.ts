import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ValidateEnv } from '@julr/vite-plugin-validate-env';
import { z } from 'zod';

export default defineConfig({
  plugins: [
    react(),
    ValidateEnv({
      schema: {
        VITE_BASE_URL: z.string().regex(/^https?:\/\/[^\s/$.?#].[^\s]*$/),
      },
    }),
  ],
});
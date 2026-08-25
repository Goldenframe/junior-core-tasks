import { existsSync } from "node:fs";
import { ValidateEnv } from "@julr/vite-plugin-validate-env";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { z } from "zod";

const isDocker = existsSync("/.dockerenv");

export default defineConfig({
  plugins: [
    react(),
    ValidateEnv({
      validator: "standard",
      schema: {
        VITE_BASE_URL: z.string().regex(/^https?:\/\/[^\s/$.?#].[^\s]*$/),
      },
    }),
  ],
  server: {
    watch: isDocker ? { usePolling: true, interval: 200 } : undefined,
  },
});

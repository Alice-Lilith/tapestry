import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite is only used to run Vitest here; tapestry ships TypeScript source, not a build.
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});

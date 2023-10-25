import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
  },
  build: {
    // Configurações de produção
    target: "es6", // ou a versão de ECMAScript desejada
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: undefined, // Limpar opções de chunking
      },
    },
  },
});

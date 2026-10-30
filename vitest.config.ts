import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// Config separada de `vite.config.ts` a proposito: esa config es `async`, esta
// entrelazada con Tauri (puerto fijo, hmr, watch) y no tiene por que pagar el
// costo ni el riesgo de los tests.
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    // Globals en false: cada test importa `describe`/`it`/`expect`/`vi` de
    // `vitest`, asi el tsconfig no necesita una lista de `types` y el build
    // sigue typechequeando la suite.
    globals: false,
    include: ['src/**/*.test.{ts,tsx}'],
    clearMocks: true,
    restoreMocks: true,
  },
});

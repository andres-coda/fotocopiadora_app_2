import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Con `globals: false` Testing Library no registra su propio cleanup: sin esto
// cada render queda montado y los tests se pisan entre si.
afterEach(() => {
  cleanup();
});

// `src/socket.ts` abre un websocket al importarse (`io(BASE)` a nivel de
// modulo). Se mockea globalmente para que ningun test pueda disparar una
// conexion real. La parte de sockets todavia no esta implementada: cuando lo
// este, los tests de esa capa tienen que usar este mismo mock.
vi.mock('./socket', () => ({
  default: {
    on: vi.fn(),
    off: vi.fn(),
    onAny: vi.fn(),
    emit: vi.fn(),
    disconnect: vi.fn(),
  },
}));

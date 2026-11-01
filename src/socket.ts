import { io } from 'socket.io-client';
import { BASE } from './utils/endpoint';

// `autoConnect: false`: el socket no abre conexion al importar el modulo.
// Lo conecta `useSockets` cuando hay token en la sesion.
const socket = io(BASE, {
  transports: ['websocket'], // Evita problemas con polling
  autoConnect: false,
  auth: (cb) => cb({ token: localStorage.getItem('token') }),
});

export default socket;

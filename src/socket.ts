import { io } from "socket.io-client";
import { BASE } from "./utils/endpoint";

const socket = io(BASE, {
  transports: ["websocket"], // Evita problemas con polling
});

export default socket;
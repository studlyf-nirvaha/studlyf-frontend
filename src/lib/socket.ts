import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function initSocket(apiBaseUrl: string, uid: string) {
  if (socket) return socket;
  socket = io(apiBaseUrl, { transports: ['websocket'], auth: { uid } });
  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}



import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io('http://127.0.0.1:5000'); // replace with your backend URL
export const SocketContext = createContext(socket);

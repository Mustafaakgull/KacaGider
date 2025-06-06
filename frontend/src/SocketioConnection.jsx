import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io('https://api.kacagider.net'); // replace with your backend URL
export const SocketContext = createContext(socket);

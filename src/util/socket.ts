import { io } from 'socket.io-client';

const socket = io('https://node-mysql-0u5t.onrender.com', {
  transports: ['websocket'],
  auth: {
    token: localStorage.getItem('accessToken'), 
  },
});

export default socket;
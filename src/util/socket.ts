import { io } from 'socket.io-client';

const socket = io('https://server-fw1f.onrender.com', {
  transports: ['websocket'],
  auth: {
    token: localStorage.getItem('accessToken'), 
  },
});

export default socket;
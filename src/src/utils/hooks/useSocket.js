import { useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';

export const useSocket = (url, onReq, app) => {
   const socket = useRef(null);
   const bindSocketEvents = () => {
      socket.current.on(url, (data) => {
         onReq(data);
      });
   };
   useEffect(() => {
      const socketUrl = `${process.env.REACT_APP_SOCKET_ENDPOINT}?uuid=${app.uuid}`;
      socket.current = socketIOClient(socketUrl);
      bindSocketEvents();
      socket.current.emit('subscribe');
   }, []);
   return {
      socket,
   };
};

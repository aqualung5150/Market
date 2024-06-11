import { Socket, io } from "socket.io-client";

const chatSocket = (() => {
  let socket: Socket | null;
  return {
    getSocket: () => socket,
    connectSocket: (query: SocketQuery) => {
      io(`${process.env.REACT_APP_BASE_URL}/chat`, {
        query: query,
        transports: ["websocket"],
      });
    },
    disconnectSocket: () => {
      if (socket && socket.connected) socket.disconnect();
    },
  };
})();

export default chatSocket;

import { Socket, io } from "socket.io-client";

const chatSocket = (() => {
  let socket: Socket | null;
  return {
    getSocket: () => socket,
    connectSocket: (query: SocketQuery) => {
      socket = io(`${process.env.REACT_APP_BASE_URL}/chat`, {
        query: query,
        transports: ["websocket"],
      });

      socket.on("hello", (payload) => {
        console.log(payload);
      });
    },
    disconnectSocket: () => {
      if (socket && socket.connected) socket.disconnect();
    },
  };
})();

export default chatSocket;

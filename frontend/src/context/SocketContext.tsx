import { createContext } from "react";
import { SocketContextProps } from "types/context";

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
});

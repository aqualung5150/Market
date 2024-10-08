import { AxiosInstance } from "axios";
import { Socket } from "socket.io-client";

interface ConnectionContextProps {
  connection: boolean;
  setConnection: Dispatch<SetStateAction<boolean>>;
  chatSocket: Socket | undefined;
}

interface SocketContextProps {
  socket: Socket | null;
}

interface ProductStatusContextType {
  status: number;
  setStatus: Dispatch<SetStateAction<number>> | null;
}

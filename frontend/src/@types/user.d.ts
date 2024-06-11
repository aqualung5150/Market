import { Socket } from "socket.io-client";

interface JwtPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

interface UserData extends JwtPayload {
  name: string;
  nickname: string;
}

interface ConnectionState {
  // id?: number;
  // email: string;
  name: string;
  // nickname: string;
  // iat?: number;
  // exp?: number;
  // socket: Socket | null;
}

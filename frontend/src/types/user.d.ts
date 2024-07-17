import React from "react";
import { Socket } from "socket.io-client";

interface JwtPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

// interface User extends JwtPayload {
//   name: string;
//   nickname: string;
// }

interface ConnectionState {
  // id?: number;
  // email: string;
  name: string;
  // nickname: string;
  // iat?: number;
  // exp?: number;
  // socket: Socket | null;
}

interface User {
  id: number;
  nickname: string;
  email: string;
  image: string;
  createdAt: Date;
}

interface PublicUser {
  id: number;
  nickname: string;
  image: string;
}

interface UsersData {
  totalSize: number;
  users: PublicUser[];
}

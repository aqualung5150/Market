import React from "react";
import { Socket } from "socket.io-client";

interface PublicUser {
  id: number;
  nickname: string;
  image: string;
  isDeleted: boolean;
}

interface UsersData {
  totalSize: number;
  users: PublicUser[];
}

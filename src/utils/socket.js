import { io } from "socket.io-client";
import BASE_URL from "./constanst";

export const createSocketConnection = () => {
  return io(BASE_URL, {
    transports: ["websocket"],
    withCredentials: true,
  });
};

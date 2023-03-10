import { io } from "socket.io-client";

const socketInit = () => {
  const option = {
    "force new connection": true,
    reconnectionAttempt: "infinity",
    timeout: 10000,
    transport: ["websocket"],
  };
  return io("http://localhost:8080", option);
};

export default socketInit;

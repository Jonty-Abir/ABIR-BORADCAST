import { io } from "socket.io-client";

const socketInit = () => {
  const option = {
    "force new connection": true,
    reconnectionAttempt: "infinity",
    timeout: 10000,
    transport: ["websocket"],
  };
  return io(process.env.REACT_APP_SERVER_URL, option);
};

export default socketInit;

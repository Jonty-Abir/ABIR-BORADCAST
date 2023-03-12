import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import cookieParser from "cookie-parser";
import http from "http";
import morgan from "morgan";
import { join } from "path";
import { Server } from "socket.io";
import { ACTION } from "./action";
import { connection } from "./connection";
import {
  defaultErrorHandler,
  notFound,
} from "./Middlewares/Common/defaultErrorHandlers";
import { router } from "./Router/router";

const app = express();
/***_______ Create http node server    ________**/

const server = http.createServer(app);
/***_______  Scoket   ________**/

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});
/***_______  External Middlewares   ________**/
dotenv.config();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
/***_______  Morgan   ________**/
app.use(morgan("tiny"));

/***_______ LOCAL= mongodb://127.0.0.1:27017/Abir    ________**/
connection();
/***_______  Internal Middlewares   ________**/
app.use("/static", express.static(join(__dirname, "../public")));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use(notFound);
app.use(defaultErrorHandler);

/***_______  Scoket.io   ________**/

// mapping

const socketUserMaping: any = {};

io.on("connection", (socket) => {
  console.log("New Connection:", socket.id);
  // form client roomID & user
  socket.on(ACTION.JOIN, ({ roomId, user }) => {
    socketUserMaping[socket.id] = user;
    // get all the clients from io adapter
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    // Add peers and offers and all
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTION.ADD_PEER, {
        peerId: socket.id,
        // offer create permission false
        createOffer: false,
        user,
      });

      // Send myself as well that much msgs how many clients

      socket.emit(ACTION.ADD_PEER, {
        peerId: clientId,
        // offer create permission true
        createOffer: true,
        user: socketUserMaping[clientId],
      });
    });
    socket.join(roomId);

    // console.log(roomId, user);
  });

  /***_______  handle relay ice   ________**/

  // client to server
  socket.on(ACTION.RELAY_ICE, ({ peerId, icecandidate }) => {
    // server to  client
    io.to(peerId).emit(ACTION.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  /***_______  Handle Relay SDP   ________**/
  // client to server
  socket.on(ACTION.RELAY_SDP, ({ peerId, sessionDescription }) => {
    // server to  client
    io.to(peerId).emit(ACTION.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  });

  /***_______  Handle Mute Un-Mute   ________**/
  // mute

  socket.on(ACTION.MUTE, ({ roomId, userId }) => {
    // console.log(userId, "mute");
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTION.MUTE, { peerId: socket.id, userId });
    });
  });
  // un_mute
  socket.on(ACTION.UN_MUTE, ({ roomId, userId }) => {
    // console.log(userId, "un-mute");
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTION.UN_MUTE, { peerId: socket.id, userId });
    });
  });

  // leve the room
  const leveRoom = () => {
    const { rooms } = socket;
    Array.from(rooms).forEach((roomId) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTION.REMOVE_PEER, {
          peerId: socket.id,
          userId: socketUserMaping[socket.id]?._id,
        });
        // for self

        socket.emit(ACTION.REMOVE_PEER, {
          peerId: clientId,
          userId: socketUserMaping[clientId]?._id,
        });
        socket.leave(roomId);
      });
    });
    //
    delete socketUserMaping[socket.id];
    // console.log("map", socketUserMaping);
  };
  socket.on(ACTION.LEAVE, leveRoom);
  //***_______     ________**/
  socket.on("disconnecting", leveRoom);
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Your server started on: http://localhost:${port}/`);
});

// External Import's
import express from "express";
// Internal Import's
import { activateController } from "../Controllers/activateController";
import { authController } from "../Controllers/authController";
import { rooms } from "../Controllers/roomsController";
import { authMiddleware } from "../Middlewares/authMiddleware";

const router = express.Router();

/***_______  http://localhost:8080/api  GET  ________**/

router.get("/", (req, res) => {
  res.status(200).json("ok");
});

/***_______  http://localhost:8080/api/send-otp  POST  ________**/

router.post("/send-otp", authController.sendOtp);

/***_______  http://localhost:8080/api/verify-otp  POST  ________**/

router.post("/verify-otp", authController.verifyOtp);

/***_______  http://localhost:8080/api/activate-user  POST  ________**/

router.post("/activate-user", authMiddleware, activateController.activate);

/***_______  http://localhost:8080/api/refresh-token  GET  ________**/

router.get("/refresh-token", authController.refreshToken);

/***_______  http://localhost:8080/api/refresh-token  POST  ________**/

router.post("/logout", authMiddleware, authController.userLogout);

/***_______  http://localhost:8080/api/rooms  POST  ________**/

router.post("/rooms", authMiddleware, rooms.create);

/***_______  http://localhost:8080/api/rooms  GET  ________**/

router.get("/rooms", authMiddleware, rooms.getAllRooms);

export { router };

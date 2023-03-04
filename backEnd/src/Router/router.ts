// External Import's
import express from "express";
// Internal Import's
import { authController } from "../Controllers/authController";
const router = express.Router();

/***_______  http://localhost:8080/api  GET  ________**/

router.get("/", (req, res) => {
  res.status(200).json("ok");
});

/***_______  http://localhost:8080/api/send-otp  POST  ________**/

router.post("/send-otp", authController.sendOtp);

/***_______  http://localhost:8080/api/verify-otp  POST  ________**/

router.post("/verify-otp", authController.verifyOtp);

export { router };

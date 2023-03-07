import cors from "cors";
// @ts-ignore
import dotenv from "dotenv";
import express from "express";

import cookieParser from "cookie-parser";
import morgan from "morgan";
import { join } from "path";
import { connection } from "./connection";
import {
  defaultErrorHandler,
  notFound,
} from "./Middlewares/Common/defaultErrorHandlers";
import { router } from "./Router/router";

const app = express();

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
/***_______     ________**/

app.use(morgan("tiny"));
/***_______     ________**/

/***_______ LOCAL= mongodb://127.0.0.1:27017/Abir    ________**/
connection();
/***_______  Internal Middlewares   ________**/
app.use("/static", express.static(join(__dirname, "../public")));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use(notFound);
app.use(defaultErrorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Your server started on: http://localhost:${port}/`);
});

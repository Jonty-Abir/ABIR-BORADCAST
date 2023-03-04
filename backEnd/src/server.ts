import cors from "cors";
import { join } from "path";
// @ts-ignore
import dotenv from "dotenv";
import express from "express";

import morgan from "morgan";
import { connection } from "./connection";
import {
  defaultErrorHandler,
  notFound,
} from "./Middlewares/Common/defaultErrorHandlers";
import { router } from "./Router/router";

const app = express();

/***_______  External Middlewares   ________**/
dotenv.config();
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(morgan("tiny"));

/***_______ LOCAL= mongodb://127.0.0.1:27017/Abir    ________**/
connection();
/***_______  Internal Middlewares   ________**/
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "Public")));

app.use("/api", router);
app.use(notFound);
app.use(defaultErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Your server started on: http://localhost:${port}/`);
});

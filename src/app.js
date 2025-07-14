import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
export default app;

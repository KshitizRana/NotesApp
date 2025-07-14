import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

export default app;

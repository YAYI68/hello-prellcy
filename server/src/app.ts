import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import dotenv from "dotenv";
import morgan from "morgan";
import CustomError from "./utils/error/CustomError";
// import errorController from "./controllers/error.controller";
import { authRoute } from "./routes";
import errorController from "./controllers/errorController";
import cors, { CorsOptions } from 'cors';

dotenv.config();

const app = express();

// IMPLEMENT MIDDLEWARE
const corsOptions: CorsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};
app.use(cors(corsOptions));
// app.use(cors())
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception occured! Shutting down...");
  process.exit(1);
});

// app routes
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/auth/", authRoute);

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

app.use(errorController);
export default app;

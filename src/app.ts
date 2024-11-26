import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { initializeDB } from "./config/db";
import passportConfig from "./config/passport";
import { mainRouter } from "./routes";

config();
const port = process.env.PORT || 8000;

export const app = express();

initializeDB()
  .then(() => {
    console.log("[db] Database is connected successfully");
    app.listen(port, () => {
      console.log(`[server] Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(`Error starting the server\nreason: ${err}`));

passportConfig();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

app.use(mainRouter);

import express from "express";
import { authRoute, usersRoute } from "../constants";
import { authRouter } from "./auth";
import { usersRouter } from "./user";

export const mainRouter = express.Router();

mainRouter.use(authRoute, authRouter);

mainRouter.use(usersRoute, usersRouter);

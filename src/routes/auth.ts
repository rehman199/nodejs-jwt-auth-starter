import express from "express";
import { signup } from "../controllers/auth";

export const authRouter = express.Router();

authRouter.post("signup", signup);

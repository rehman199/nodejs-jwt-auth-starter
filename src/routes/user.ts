import express from "express";
import passport from "passport";
import { getCurrentUser } from "../controllers/user";

export const usersRouter = express.Router();

usersRouter.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser,
);

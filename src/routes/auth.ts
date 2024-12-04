import express, { RequestHandler } from "express";
import { body, validationResult } from "express-validator";
import { signin, signup } from "../controllers/auth";

export const authRouter = express.Router();

const validateRequest: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else {
    res.status(400).json({ errors: errors.array() });
    return;
  }
};

authRouter
  .post(
    "/signup",
    [
      body("user.email").notEmpty().withMessage("Email is required"),
      body("user.password").notEmpty().withMessage("Password is required"),
    ],
    validateRequest,
    signup,
  )
  .post(
    "/signin",
    [
      body("user.email").notEmpty().withMessage("Email is required"),
      body("user.password").notEmpty().withMessage("Password is required"),
    ],
    validateRequest,
    signin,
  );

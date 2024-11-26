import { RequestHandler } from "express";
import { userMessages } from "../constants/messages";

export const signup: RequestHandler = async (req, res) => {
  try {
    res.status(200).json({ message: userMessages.SIGNUP_SUCCESS });
  } catch (err: unknown) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error", error: (err as Error).message });
  }
};

export const signin: RequestHandler = async (req, res) => {
  try {
    res.status(200).json({ message: userMessages.SIGNIN_SUCCESS });
  } catch (err: unknown) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error", error: (err as Error).message });
  }
};

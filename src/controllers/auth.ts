import { RequestHandler } from "express";
import { userMessages } from "../constants/messages";
import User from "../models/user";
import { generateToken } from "../utils";

export const signup: RequestHandler = async (req, res) => {
  try {
    const reqUser = req.body.user;
    const user = await User.create(reqUser);
    res.status(200).json({ user, message: userMessages.SIGNUP_SUCCESS });
  } catch (err: unknown) {
    console.log(err);
    res.status(500).json({ error: (err as Error).message });
  }
};

export const signin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body.user;
    const user = await User.getByCredentials(email, password);

    if (!user) {
      res.status(404).json({ error: userMessages.NOT_FOUND });
      return;
    }

    const accessToken = generateToken({ email, id: user._id.toString() });
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.status(200).json({ accessToken, message: userMessages.SIGNIN_SUCCESS });
  } catch (err: unknown) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error", error: (err as Error).message });
  }
};

import { RequestHandler } from "express";

export const getCurrentUser: RequestHandler = async (req, res) => {
  try {
    res.status(200).json({ user: {} });
  } catch (err: unknown) {
    console.log(err);
    res.status(500).json({ error: "User not found" });
  }
};

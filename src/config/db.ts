import mongoose from "mongoose";

export const initializeDB = async () => {
  const URI = process.env.DATABASE_URI;

  if (!URI) throw new Error("Invalid Database URI");

  return await mongoose.connect(URI);
};

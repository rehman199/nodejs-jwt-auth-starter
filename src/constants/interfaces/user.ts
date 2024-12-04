import mongoose from "mongoose";

export interface IUser extends Document {
  _id: mongoose.ObjectId;
  provider: string;
  firstName?: string;
  lastName?: string;
  email: string;
  photo?: string;
  password: string;
  username?: string;
}

import bcrypt from "bcryptjs";
import mongoose, { CallbackError, Model, Schema } from "mongoose";
import { IUser } from "../constants/interfaces/user";
import { checkPasswordStrength } from "../utils";

interface IUserModel extends Model<IUser> {
  getByCredentials: (email: string, password: string) => Promise<IUser | null>;
}

const userSchema: Schema<IUser> = new Schema({
  provider: {
    type: String,
  },
  username: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    length: [8, "Password must be 8 characters long"],
    validate: {
      validator: checkPasswordStrength,
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(
      parseInt(process.env.SALT_ROUNDS || "10"),
    );
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: unknown) {
    next(err as CallbackError);
  }
});

userSchema.methods.authenticate = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.statics.getByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) return null;

  return (await user.authenticate(password)) ? user : null;
};

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;

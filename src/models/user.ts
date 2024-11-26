import bcrypt from "bcryptjs";
import mongoose, { CallbackError } from "mongoose";
import { checkPasswordStrength } from "../utils";

const userSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    unique: true,
    required: true,
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
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

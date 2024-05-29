import { model, Model, Schema, Document } from "mongoose";
import { IUser } from "../entity/User.entity";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
require("dotenv").config();

export interface UserDocument extends IUser, Document {
  comparePasword: (password: string) => Promise<boolean>;
  signAccessToken: () => string;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "User", timestamps: true }
);
UserSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePasword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.signAccessToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: 60 * 60,
  });
};

export const UserModel: Model<UserDocument> = model("User", UserSchema);

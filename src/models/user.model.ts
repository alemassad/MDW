import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  name: string;
  lastname: string;
  birthdate: Date;
  email: string;
  isAdmin: boolean;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    birthdate: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<User>("User", UserSchema);

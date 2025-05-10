import mongoose, { Schema, Document } from "mongoose";

interface Car extends Document {
  name: string;
  description: string;
  amount: number;
    price: number;
    isActive: boolean;
    ownerId: string;
    image: string;
 }

const CarSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    ownerId: { type: String },
    image: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId, ref: "User"}
  },
  {
    timestamps: true,
  }
);

export const Car = mongoose.model<Car>("Car", CarSchema);

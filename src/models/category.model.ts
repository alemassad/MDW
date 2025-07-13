import mongoose, { Schema, Document } from "mongoose";

interface Category extends Document {
  name: string;
  description: string;
  cars?: string[];
  isActive?: boolean;
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model<Category>("Category", CategorySchema);

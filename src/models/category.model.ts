import mongoose, { Schema, Document } from "mongoose";

interface Category extends Document {
  name: string;
  description: string;
 cars: string[];
 }

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cars: [{ type: Array<mongoose.Schema.Types.ObjectId>, ref: "Car" }],
  
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model<Category>("Category", CategorySchema);

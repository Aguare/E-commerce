import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: String,
    image: String,
  },
  {
    versionKey: false,
  }
);

export default model("Category", categorySchema);

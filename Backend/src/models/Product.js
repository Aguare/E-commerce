import { Schema, model } from "mongoose";
import path from "path";

const productSchema = new Schema(
  {
    name: String,
    user_seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: String,
    image: String,
    price: Number,
    stock: Number,
    allowed: {
      type: Boolean,
      default: false,
    },
    categorys: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Product", productSchema);

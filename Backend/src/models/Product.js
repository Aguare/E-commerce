import { Schema, model } from "mongoose";

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
      type: Number,
      default: 1,
    },
    category: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", productSchema);

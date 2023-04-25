import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
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

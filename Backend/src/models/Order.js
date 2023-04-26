import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    user_seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    user_client: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    status: {
      type: String,
      enum: ["pending", "delivered", "canceled"],
      default: "pending",
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    card: {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
    total: Number,
    date_delivered: Date,
    date_create: Date,
    date_cancel: Date,
  },
  {
    timestamps: true,
  }
);

export default model("Order", orderSchema);

import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user_client: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "delivered", "canceled"],
      default: "pending",
    },
    address: String,
    card: {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
    total: Number,
    date_delivered: Date,
    date_cancel: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Order", orderSchema);

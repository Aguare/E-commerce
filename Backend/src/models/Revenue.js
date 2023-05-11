import { Schema, model } from "mongoose";

const revenueSchema = new Schema(
  {
    user_seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    user_client: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    revenue_seller: Number,
    revenue_corporation: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Revenue", revenueSchema);

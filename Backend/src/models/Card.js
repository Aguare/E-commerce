import { Schema, model } from "mongoose";

const cardSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    cvv: Number,
    expiration_mont: Number,
    expiration_year: Number,
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default model("Card", cardSchema);

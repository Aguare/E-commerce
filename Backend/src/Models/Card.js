import { Schema, model } from "mongoose";
import { Schema, model } from "mongoose";

const cardSchema = new Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  owner: {
    type: String,
    required: true,
    trim: true,
  },
  cvv: Number,
  expiration_mont: Number,
  expiration_year: Number,
});

export default model("Card", cardSchema);

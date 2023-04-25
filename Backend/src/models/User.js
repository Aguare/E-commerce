import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    names: String,
    last_names: String,
    date_birth: Date,
    phone: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", userSchema);

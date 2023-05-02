import { Schema, model } from "mongoose";

const departamentSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
    },
    municipios: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default model("Departament", departamentSchema);

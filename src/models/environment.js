import { Schema, model } from "mongoose";

const EnvironmentSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    text: String,
    nivel: String,
  },
  daysClases: [String],
  entryTime: {
    type: Date,
  },
  departureTime: {
    type: Date,
  },
  area: {
    type: String,
  },
  location: {
    type: String,
  },
  maximiumStudents: Number,
  tutor: [
    {
      type: Schema.Types.ObjectId,
      ref: "Usuarios",
    },
  ],
});

export default model("Environment", EnvironmentSchema);

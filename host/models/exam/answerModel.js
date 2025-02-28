import mongoose, { Schema } from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    choice: {
      type: String,
      enum: ["A", "B", "C", "D", "E", "F", "G"],
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;

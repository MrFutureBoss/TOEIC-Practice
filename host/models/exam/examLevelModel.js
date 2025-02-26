import mongoose, { Schema } from "mongoose";

const examLevelSchema = new mongoose.Schema(
  {
    name: {
      type: Number,
      required: true,
      enum: [100, 200, 300, 400, 500, 600, 750],
    },
  },
  {
    timestamp: true,
  }
);

const ExamLevel = mongoose.model("ExamLevel", examLevelSchema);

export default ExamLevel;

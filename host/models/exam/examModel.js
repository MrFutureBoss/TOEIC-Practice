import mongoose, { Schema } from "mongoose";

const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamTopic",
    },
    type: {
      type: String,
      enum: ["test", "practice"],
      default: "practice",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    levels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExamLevel",
        required: true,
      },
    ],
    time: {
      type: String,
      default: "120",
    },
    listenings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listening",
      },
    ],
    readings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reading",
      },
    ],
    speakings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Speaking",
      },
    ],
    writings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Writing",
      },
    ],
    totalScore: {
      type: Number,
      min: 0,
      max: 990,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const Exam = mongoose.model("Exam", examSchema);

export default Exam;

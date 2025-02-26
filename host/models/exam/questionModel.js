import mongoose, { Schema } from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    No: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    image:{
      type: String,
      required: false,
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
        required: true,
      },
    ],
    correctAnswers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
      required: true,
    },
    score: {
      type: Number,
      min: 0,
      max: 990,
      required: true,
    },
    soundTrack: {
      type: String,
      required: false,
    },
  },
  {
    timestamp: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;

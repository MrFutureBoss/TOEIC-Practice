import mongoose, { Schema } from "mongoose";

const readingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    example: [
      {
        type: {
          type: String,
          enum: ["image, text"],
          default: "text",
          required: false,
        },
        content: {
          type: String,
          required: false,
        },
      },
    ],
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
    ],
    totalQuestion: {
      type: Number,
      min: 0,
      max: 500,
      required: true,
    },
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

const Reading = mongoose.model("Reading", readingSchema);

export default Reading;

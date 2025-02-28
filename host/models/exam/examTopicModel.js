import mongoose, { Schema } from "mongoose";

const examTopicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExamTopic = mongoose.model("ExamTopic", examTopicSchema);

export default ExamTopic;

import Exam from "../../models/exam/examModel.js";

//List all exam data
const getExam = async (req, res) => {
  try {
    const exam = await Exam.find()
      .populate("topic")
      .populate("levels")
      .populate("listenings")
      .populate("readings")
      .populate("speakings")
      .populate("writtings");
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Create new exam
const createExam = async (req, res) => {
  const exam = new Exam(req.body);
  try {
    const savedExam = await exam.save();
    res.status(201).json(savedExam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default { getExam, createExam };

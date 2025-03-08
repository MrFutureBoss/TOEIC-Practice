import Exam from "../../models/exam/examModel.js";
import Listening from "../../models/exam/listeningModel.js";
import Reading from "../../models/exam/readingModel.js";
// import Speaking from "../../models/exam/speakingModel.js";
// import Writing from "../../models/exam/writingModel.js";
import Question from "../../models/exam//questionModel.js";
import Answer from "../../models/exam/answerModel.js";
import paginate from "../../utilities/paginate.js";
//List all exam data
const getExam = async (req, res) => {

  const { page = 1, limit = 10 } = req.query;
  try {
    const { results, total, totalPages, currentPage, limit: paginateLimit } = await paginate(Exam, {}, { page, limit });

    // Populate detailed refs
    const populatedExams = await Promise.all(
      results.map(async (exam) => {
        const populatedExam = await Exam.populate(exam, [
          { path: "topic" },
          { path: "levels" },
          { path: "listenings", populate: { path: "questions", populate: { path: "answers" } } },
          { path: "readings", populate: { path: "questions", populate: { path: "answers" } } },
        ]);
        return populatedExam;
      })
    );

    res.status(200).json({
      data: populatedExams,
      pagination: {
        total,
        totalPages,
        currentPage,
        limit: paginateLimit,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Helper function to create answers for a question
const createAnswers = async (answers) => {
  const createdAnswers = await Promise.all(
    answers.map(async (answer) => {
      const createdAnswer = new Answer(answer);
      await createdAnswer.save();
      return createdAnswer._id;
    })
  );
  return createdAnswers;
};

// Helper function to create questions for a ref (Listening, Reading, Speaking, Writing)
const createQuestions = async (questions) => {
  const createdQuestions = await Promise.all(
    questions.map(async (question) => {
      const { answers, correctChoice, ...questionData } = question;
      const createdQuestion = new Question(questionData);

      if (answers && answers.length > 0) {
        // Tạo các câu trả lời
        createdQuestion.answers = await createAnswers(answers);

        // Tìm correctAnswer dựa trên correctChoice
        const correctAnswer = await Answer.findOne({
          _id: { $in: createdQuestion.answers },
          choice: correctChoice,
        });

        if (correctAnswer) {
          createdQuestion.correctAnswers = correctAnswer._id;
        } else {
          throw new Error(
            `Correct choice "${correctChoice}" not found in answers.`
          );
        }
      }

      await createdQuestion.save();
      return createdQuestion._id;
    })
  );
  return createdQuestions;
};

// Helper function to create a ref (Listening, Reading, Speaking, Writing)
const createRef = async (refData, RefModel) => {
  const { questions, ...data } = refData;
  const createdRef = new RefModel(data);

  if (questions && questions.length > 0) {
    createdRef.questions = await createQuestions(questions);
  }

  await createdRef.save();
  return createdRef._id;
};

// Create new exam with nested refs
const createExam = async (req, res) => {
  const { listenings, readings, ...examData } = req.body;

  try {
    // Create Exam
    const exam = new Exam(examData);

    // Create Listenings
    if (listenings && listenings.length > 0) {
      exam.listenings = await Promise.all(
        listenings.map((listening) => createRef(listening, Listening))
      );
    }

    // Create Readings
    if (readings && readings.length > 0) {
      exam.readings = await Promise.all(
        readings.map((reading) => createRef(reading, Reading))
      );
    }

    // Save the exam
    const savedExam = await exam.save();
    res.status(201).json({
      message: "Exam created successfully",
      data: savedExam,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default { getExam, createExam };

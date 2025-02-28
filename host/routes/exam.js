import { Router } from "express";
import examController from "../controllers/exam/index.js";
const ExamRouter = Router();

//List all exam
ExamRouter.get("/list", examController.getExam);

//Create new exam
ExamRouter.post("/create", examController.createExam)

export default ExamRouter;

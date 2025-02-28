import express from "express";
import routerFiles from "./upload.js";
import ExamRouter from "./exam.js";
const router = express.Router();

router.use("/files", routerFiles);
router.use("/exams", ExamRouter);
export default router;

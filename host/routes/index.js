import express from 'express';
import routerFiles from './upload.js';
const router = express.Router();

router.use("/files", routerFiles);
export default router
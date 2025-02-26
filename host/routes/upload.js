import { Router } from "express";
import { uploadFiles } from "../controllers/files.js";
import { uploadImages, uploadVideos, uploadSounds, uploadDocs } from "../middlewares/filesFormat.js";

const routerFiles = Router();

// Route upload ảnh
routerFiles.post("/upload/image", uploadImages, uploadFiles);

// Route upload video
routerFiles.post("/upload/video", uploadVideos, uploadFiles);

// Route upload âm thanh
routerFiles.post("/upload/sound", uploadSounds, uploadFiles);

// Route upload tài liệu
routerFiles.post("/upload/doc", uploadDocs, uploadFiles);

export default routerFiles;
import express from "express";
import cloudinary from "../utilities/cloudinary.js";
import fs from "fs";
import path from "path";

// Định nghĩa các định dạng file được chấp nhận
const allowedFormats = {
  image: ["jpg", "jpeg", "png", "gif", "svg"], // Ảnh
  video: ["mp4", "mov", "avi", "mkv"], // Video
  sound: ["mp3", "wav"], // Âm thanh
  doc: ["txt", "docx", "pdf"], // Tài liệu
};

// Hàm kiểm tra định dạng file và trả về loại file
const getFileType = (fileExtension) => {
  for (const [type, formats] of Object.entries(allowedFormats)) {
    if (formats.includes(fileExtension)) {
      return type; // Trả về loại file (image, video, sound, doc)
    }
  }
  return null; // Nếu không thuộc loại nào
};

// Middleware để xử lý upload nhiều file
const uploadMiddleware = (fileType) => {
  return (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    const validFiles = req.files.filter((file) => {
      const fileExtension = path.extname(file.name).toLowerCase().slice(1); // Lấy phần mở rộng của file
      return allowedFormats[fileType].includes(fileExtension);
    });

    if (validFiles.length === 0) {
      return res.status(400).send(`Only ${fileType} files are allowed!`);
    }

    // Lưu các file tạm thời vào thư mục uploads
    const tempFilePaths = validFiles.map((file) => {
      const tempFilePath = path.join(__dirname, "uploads", file.name);
      file.mv(tempFilePath); // Di chuyển file vào thư mục tạm thời
      return tempFilePath;
    });

    // Gắn các file tạm thời vào request để sử dụng trong controller
    req.tempFilePaths = tempFilePaths;
    next();
  };
};

// Middleware cho từng loại file
const uploadImages = uploadMiddleware("image");
const uploadVideos = uploadMiddleware("video");
const uploadSounds = uploadMiddleware("sound");
const uploadDocs = uploadMiddleware("doc");

export { uploadImages, uploadVideos, uploadSounds, uploadDocs };
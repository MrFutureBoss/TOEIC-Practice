import cloudinary from "../utilities/cloudinary.js";
import fs from "fs";

export const uploadFiles = async (req, res) => {
  try {
    const tempFilePaths = req.tempFilePaths;
    console.log("Processing files:", tempFilePaths); // Log các file cần xử lý

    const uploadResults = [];

    for (const filePath of tempFilePaths) {
      console.log("Uploading file:", filePath); // Log file đang được upload
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "TOEIC",
        resource_type: "auto",
      });

      uploadResults.push({
        url: result.secure_url,
        publicId: result.public_id,
      });

      fs.unlinkSync(filePath);
      console.log("Deleted temporary file:", filePath); // Log file tạm thời đã xóa
    }

    return res.status(200).json({
      message: "Upload files successfully!",
      datas: uploadResults,
    });
  } catch (error) {
    console.error("Controller error:", error); // Log lỗi trong controller

    if (req.tempFilePaths) {
      req.tempFilePaths.forEach((filePath) => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
};
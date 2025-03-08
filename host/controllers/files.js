import cloudinary from "../utilities/cloudinary.js";
import fs from "fs";

export const uploadFiles = async (req, res) => {
  try {
    const tempFilePaths = req.tempFilePaths;
    console.log("Processing files:", tempFilePaths); // Log các file cần xử lý

    const uploadResults = [];

    // Lặp qua từng file và upload lên Cloudinary
    for (const filePath of tempFilePaths) {
      console.log("Uploading file:", filePath); // Log file đang được upload

      // Upload file lên Cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "TOEIC",
        resource_type: "auto", // Tự động phát hiện loại file (image, video, audio, raw)
      });

      // Lưu kết quả upload
      uploadResults.push({
        url: result.secure_url, // URL của file
        publicId: result.public_id, // Public ID của file trên Cloudinary
        resourceType: result.resource_type, // Loại file (image, video, audio, raw)
      });

      // Xóa file tạm sau khi upload thành công
      fs.unlinkSync(filePath);
      console.log("Deleted temporary file:", filePath); // Log file tạm thời đã xóa
    }

    // Trả về kết quả upload
    return res.status(200).json({
      message: "Upload files successfully!",
      datas: uploadResults, // Danh sách các file đã upload với URL và thông tin khác
    });
  } catch (error) {
    console.error("Controller error:", error); // Log lỗi trong controller

    // Nếu có lỗi, xóa tất cả các file tạm (nếu có)
    if (req.tempFilePaths) {
      req.tempFilePaths.forEach((filePath) => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    // Trả về lỗi
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
};
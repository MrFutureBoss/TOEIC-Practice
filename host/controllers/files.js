import cloudinary from "../utilities/cloudinary.js";
import fs from "fs";

export const uploadFiles = async (req, res) => {
  try {
    const tempFilePaths = req.tempFilePaths; // Lấy danh sách các file tạm thời
    const uploadResults = [];

    // Upload từng file lên Cloudinary
    for (const filePath of tempFilePaths) {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "TOEIC", // Thư mục trên Cloudinary
        resource_type: "auto", // Tự động phát hiện loại file
      });

      uploadResults.push({
        url: result.secure_url,
        publicId: result.public_id,
      });

      // Xóa file tạm thời sau khi upload thành công
      fs.unlinkSync(filePath);
    }

    return res.status(200).json({
      message: "Upload files successfully!",
      datas: uploadResults,
    });
  } catch (error) {
    // Xóa các file tạm thời nếu có lỗi
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
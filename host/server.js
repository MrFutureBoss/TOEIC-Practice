import express, { json } from "express";
import dotenv from "dotenv";
//.Env
dotenv.config();
import cors from "cors";
import connectDB from "./utilities/database.js";
import router from "./routes/index.js";
import http from "http";
import cloudinary from "./utilities/cloudinary.js";
import fs from "fs"; 

const app = express();

//Create HTTP
const server = http.createServer(app);

//Add cors for client to access API
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

//Add JSON parsing middleware
app.use(json());
const port = process.env.PORT || 9999;

//Connect DB
connectDB();

//Call API
app.use("/api", router);

//Global error and handle it
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.status || 500,
    message: err.message || "Internal Server Error from code",
  });
});

// // Test kết nối Cloudinary
// const testCloudinaryConnection = async () => {
//   try {
//     // Đường dẫn đến file ảnh bạn muốn upload
//     const filePath = "./uploads/crowcat.jpg"; // Thay đổi đường dẫn này nếu cần

//     // Kiểm tra xem file có tồn tại không
//     if (!fs.existsSync(filePath)) {
//       console.error("File không tồn tại:", filePath);
//       return;
//     }

//     // Upload file lên Cloudinary
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: "test-uploads", // Thư mục trên Cloudinary
//       resource_type: "auto", // Tự động phát hiện loại file
//     });

//     console.log("Upload thành công! Kết quả:", result);
//   } catch (error) {
//     console.error("Lỗi khi upload file lên Cloudinary:", error);
//   }
// };

// // Gọi hàm test kết nối Cloudinary khi server khởi động
// testCloudinaryConnection();

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

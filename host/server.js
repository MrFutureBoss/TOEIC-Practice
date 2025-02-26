import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utilities/database.js";
import router from "./routes/index.js";
import http from "http";

//.Env
dotenv.config();

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

server

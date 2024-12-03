import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import airQualityRoutes from "./routes/airQualityRoutes";
// import { runIngestionProcess } from "./utils/ingestData";

dotenv.config();
connectDB();

const app = express();

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

app.all("/", (req, res) => {
  res.send("Success from server !!");
});
app.use("/api", airQualityRoutes);

// // Run data ingestion during server startup
// (async () => {
//   try {
//     console.log("Starting data ingestion process...");
//     await runIngestionProcess();
//   } catch (error) {
//     console.error("Error during data ingestion:", error);
//   }
// })();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

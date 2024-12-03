import express from "express";
import multer from "multer";
import {
  addInitialData,
  checkIfDataExist,
  fetchAllData,
  fetchFilteredData,
} from "../controllers/airQualityController";

const router = express.Router();

// Set up Multer for memory storage or direct stream-based storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/all-data", fetchAllData);
router.get("/check-if-data", checkIfDataExist);
router.get("/filtered-data", fetchFilteredData);
router.post("/fileupload", upload.single("file"), addInitialData);

export default router;

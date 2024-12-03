/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import AirQuality from "../models/AirQuality";
import fs from "fs";
import path from "path";
import { ingestFromCSV } from "../utils/utils";

export const fetchAllData = async (req: Request, res: Response) => {
  try {
    const data = await AirQuality.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error adding data", error });
  }
};

export const checkIfDataExist = async (req: Request, res: Response) => {
  try {
    const data = await AirQuality.find({});

    res.status(200).json({ hasData: data?.length > 0 ? true : false });
  } catch (error) {
    res.status(500).json({ message: "Error adding data", error });
  }
};

export const addInitialData = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  try {
    const uploadsDir = path.join(__dirname, "../uploads");

    // Ensure the 'uploads' directory exists, create it if it doesn't
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true }); // 'recursive: true' will create nested directories if needed
    }

    const tempFilePath = path.join(
      uploadsDir,
      `${Date.now()}_${req.file.originalname}`
    );

    const writeStream = fs.createWriteStream(tempFilePath);

    writeStream.write(req.file.buffer);

    writeStream.on("finish", async () => {
      try {
        console.log("📈 Ingesting data from CSV into MongoDB...");
        await ingestFromCSV(tempFilePath); // Process the uploaded CSV file
        console.log("✅ Data ingestion completed successfully!");
        fs.unlinkSync(tempFilePath); // Remove file after processing
        res
          .status(200)
          .json({ message: "File uploaded and processed successfully" });
      } catch (error) {
        console.error("Error processing file", error);
        res.status(500).json({ message: "Error processing file" });
      }
    });

    writeStream.end();
  } catch (error) {
    console.error("Error saving file", error);
    res.status(500).json({ message: "Error saving file" });
  }
};

export const fetchFilteredData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { startDate, endDate, parameters } = req.query;

    if (!startDate || !endDate) {
      res.status(400).json({ message: "Start and end dates are required" });
      return;
    }

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      res.status(400).json({ message: "Invalid date format" });
      return;
    }

    // Parse parameters
    const paramList =
      (parameters as string)?.split(",").filter((p) => p.trim()) || [];

    // If no parameters, return an empty array
    if (paramList.length === 0) {
      res.status(200).json([]);
      return;
    }

    paramList.push("dateTime"); // always need dateTime

    // Build the query
    const query: any = {
      dateTime: { $gte: start, $lte: end }, // Filter by date range
    };

    // Fetch the data with selected fields
    const data = await AirQuality.find(query, paramList.join(" "));

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

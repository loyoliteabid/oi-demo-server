import { PythonShell } from "python-shell";
import path from "path";
import AirQuality from "../models/AirQuality";
import { ingestFromCSV } from "./utils";

// Check if data already exists in MongoDB
async function isDataAvailable(): Promise<boolean> {
  const count = await AirQuality.countDocuments();
  return count > 0;
}

// Fetch data as CSV from the Python script
async function fetchDataAsCSV(): Promise<string> {
  const scriptPath = path.resolve(__dirname, "fetch_air_quality.py");
  try {
    const pythonOptions = process.env.PYTHON_PATH
      ? { pythonPath: process.env.PYTHON_PATH } // Use PYTHON_PATH from .env file
      : {}; // Default if not provided

    console.log(`Running Python script at ${scriptPath} to fetch data...`);
    await PythonShell.run(scriptPath, pythonOptions); // Run the Python script with the specified Python interpreter
    console.log("Data fetching completed successfully.");
    return path.resolve(__dirname, "air_quality.csv"); // Return the CSV file path
  } catch (err) {
    console.error("❌ Error occurred while fetching data: ", err);
    return ""; // Return empty if there's an error
  }
}

// Main function to handle data ingestion process
export async function runIngestionProcess() {
  console.log("🔍 Checking if data exists in MongoDB...");

  if (await isDataAvailable()) {
    console.log("✅ Data already exists in MongoDB. Skipping ingestion.");
    return;
  }

  console.log("🚀 No data found in MongoDB. Fetching data...");

  const csvPath = await fetchDataAsCSV();

  if (csvPath) {
    console.log("📈 Ingesting data from CSV into MongoDB...");
    await ingestFromCSV(csvPath); // Ingest data from CSV into MongoDB
    console.log("✅ Data ingestion completed successfully!");
  } else {
    console.log(
      "⚠️ Unable to proceed with auto ingestion. Please upload a file via the frontend."
    );
  }
}

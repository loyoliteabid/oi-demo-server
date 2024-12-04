/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import Papa from "papaparse";
import moment from "moment";

import AirQuality from "../models/AirQuality";

// Map CSV row to AirQuality data
export function mapToAirQuality(
  row: Record<string, string | undefined>
): Record<string, any> {
  const rawDate = row["Date"] || ""; // Get the date, empty if missing
  const rawTime = row["Time"] || ""; // Get the time, empty if missing

  // Combine date and time into a valid ISO DateTime string
  const dateTime = moment
    .utc(
      `${rawDate} ${rawTime}`,
      "DD/MM/YYYY HH.mm.ss",
      true // Strict parsing
    )
    .isValid()
    ? moment.utc(`${rawDate} ${rawTime}`, "DD/MM/YYYY HH.mm.ss").toDate() // ISO Date object
    : null; // Invalid or missing, set to null

  // Helper to parse numbers safely (replace commas with dots for float values)
  const parseNumber = (value: string | undefined): number | null => {
    const parsed = value ? parseFloat(value.replace(",", ".")) : null;
    return isNaN(parsed as number) ? null : parsed;
  };

  return {
    date: rawDate, // Keep the original date
    time: rawTime, // Keep the original time
    dateTime, // Store the combined valid ISO Date object or null
    co_gt: parseNumber(row["CO(GT)"]),
    pt08_s1_co: parseNumber(row["PT08.S1(CO)"]),
    nmhc_gt: parseNumber(row["NMHC(GT)"]),
    c6h6_gt: parseNumber(row["C6H6(GT)"]),
    pt08_s2_nmhc: parseNumber(row["PT08.S2(NMHC)"]),
    nox_gt: parseNumber(row["NOx(GT)"]),
    pt08_s3_nox: parseNumber(row["PT08.S3(NOx)"]),
    no2_gt: parseNumber(row["NO2(GT)"]),
    pt08_s4_no2: parseNumber(row["PT08.S4(NO2)"]),
    pt08_s5_o3: parseNumber(row["PT08.S5(O3)"]),
    temperature: parseNumber(row["T"]),
    relative_humidity: parseNumber(row["RH"]),
    absolute_humidity: parseNumber(row["AH"]),
  };
}

// Ingest data from CSV file into MongoDB
export async function ingestFromCSV(filePath: string) {
  const rows: Record<string, any>[] = [];
  // Read the CSV file and parse using PapaParse
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const parsed = Papa.parse(fileContent, {
    header: true, // Use the first row as header
    skipEmptyLines: true, // Skip empty lines
    delimiter: ";", // Define the delimiter as semicolon (adjust if necessary)
  });

  // Check if parsing is successful
  if (parsed.errors.length > 0) {
    console.error("Parsing errors:", parsed.errors);
    return;
  }

  for (const row of parsed.data) {
    try {
      const mappedRow = mapToAirQuality(
        row as Record<string, string | undefined>
      ); // Validate and map row

      // Skip rows with invalid dateTime (if both date and time are invalid)
      if (!mappedRow.dateTime) {
        console.warn("Skipping invalid row due to invalid date/time:", row);
        continue; // Skip this row and move to the next one
      }
      rows.push(mappedRow); // Valid row, add to insert array
    } catch (error: any) {
      console.warn("Skipping invalid row:", row, error?.message);
      continue; // Skip this row and move to the next one
    }
  }

  if (rows.length > 0) {
    await AirQuality.insertMany(rows); // Insert valid rows into the database
    console.log(`${rows.length} valid records inserted from CSV.`);
  } else {
    console.warn("No valid records found to insert.");
  }
}

import mongoose, { Schema, Document } from "mongoose";

interface IAirQuality extends Document {
  date: string; // Original date string
  time: string; // Original time string
  dateTime: Date | null; // Combined and validated DateTime
  co_gt: number | null; // Carbon Monoxide
  pt08_s1_co: number | null; // Sensor value for CO
  nmhc_gt: number | null; // Non-Methanic Hydrocarbons
  c6h6_gt: number | null; // Benzene
  pt08_s2_nmhc: number | null; // Sensor value for NMHC
  nox_gt: number | null; // Nitrogen Oxides
  pt08_s3_nox: number | null; // Sensor value for NOx
  no2_gt: number | null; // Nitrogen Dioxide
  pt08_s4_no2: number | null; // Sensor value for NO2
  pt08_s5_o3: number | null; // Sensor value for O3
  temperature: number | null; // Temperature
  relative_humidity: number | null; // Relative Humidity
  absolute_humidity: number | null; // Absolute Humidity
}

const AirQualitySchema: Schema = new Schema({
  date: { type: String, required: false },
  time: { type: String, required: false },
  dateTime: { type: Date, default: null },
  co_gt: { type: Number, default: null },
  pt08_s1_co: { type: Number, default: null },
  nmhc_gt: { type: Number, default: null },
  c6h6_gt: { type: Number, default: null },
  pt08_s2_nmhc: { type: Number, default: null },
  nox_gt: { type: Number, default: null },
  pt08_s3_nox: { type: Number, default: null },
  no2_gt: { type: Number, default: null },
  pt08_s4_no2: { type: Number, default: null },
  pt08_s5_o3: { type: Number, default: null },
  temperature: { type: Number, default: null },
  relative_humidity: { type: Number, default: null },
  absolute_humidity: { type: Number, default: null },
});

export default mongoose.model<IAirQuality>("AirQuality", AirQualitySchema);

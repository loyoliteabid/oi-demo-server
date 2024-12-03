# OI Demo Server

This server app is built with Node.js and TypeScript to handle data ingestion and backend operations for the OI Demo App. It processes air quality data collected from March 2004 to February 2005 by an air quality monitoring device located in an Italian city.

---

## Getting Started

### Prerequisites

- Ensure you have Node.js installed.
- MongoDB must be installed and running on your machine.

### Steps to Set Up

1. **Clone the Repository**

   ```bash
   git clone https://github.com/loyoliteabid/oi-demo-server
   cd oi-demo-server
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Server**
   ```bash
   npm run dev
   ```
   - The server will start listening on port `5000`.
   - On startup, the app will attempt to download the [Air Quality Dataset](https://archive.ics.uci.edu/dataset/360/air+quality) using a Python script and ingest the data into MongoDB.
   - If ingestion fails, you can manually upload the file through the frontend app ([OI Demo Client](https://github.com/loyoliteabid/oi-demo-client)).

---

## Environment Variables

The `.env` file is ignored for security. Use `.env-example` as a reference and configure your environment:

```env
MONGO_URI=mongodb://127.0.0.1:27017/air_quality_demo
```

---

## Project Structure

```plaintext
src
├── config
├── controllers
├── models
├── routes
├── uploads
├── utils
└── app.ts (root)
```

---

## Features

- **Data Ingestion**: Automatically downloads and ingests air quality data into MongoDB using `python-shell`.
- **CSV Parsing**: Uses `papaparse` for parsing CSV files.
- **Docker Support**: Optional Docker setup for easy deployment.

---

## Docker Setup

1. **Build Docker Image**

   ```bash
   docker build -t oi-demo-server .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up
   ```

---

## CSV Format

Ensure the uploaded CSV file has the following headers:

```csv
Date;Time;CO(GT);PT08.S1(CO);NMHC(GT);C6H6(GT);PT08.S2(NMHC);NOx(GT);PT08.S3(NOx);NO2(GT);PT08.S4(NO2);PT08.S5(O3);T;RH;AH;
```

---

## Notes

- MongoDB must be running locally or accessible via the provided `MONGO_URI`.
- The auto-ingestion feature demonstrates usability but can be bypassed if manual CSV upload is preferred.
- Ensure the Python environment is properly set up for running the Python script.

Feel free to explore and extend the app's functionality!

# OI Demo Server

This server app is built with Node.js and TypeScript to handle data ingestion and backend operations for the OI Demo App. It processes air quality data collected from March 2004 to February 2005 by an air quality monitoring device located in an Italian city.

---

## Getting Started

### Prerequisites

- Ensure you have Node.js installed.
- MongoDB must be installed and running on your machine (if not using Docker).

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

- **CSV Parsing**: Uses `papaparse` for parsing CSV files.
- **Docker Support**: Optional Docker setup for easy deployment.

---

## Docker Setup

### Dockerfile

The server is pre-configured with a `Dockerfile` to set up the Node.js environment.

### Steps to Use Docker

1. **Build the Docker Image**

   ```bash
   docker-compose build
   ```

2. **Run the Docker Containers**

   ```bash
   docker-compose up
   ```

3. **Stop the Containers**
   ```bash
   docker-compose down
   ```

### Docker Services

- **App**: Runs the Node.js server on port `5000`.
- **MongoDB**: A MongoDB instance running on port `27017`.

### Docker Volumes

- MongoDB data is persisted using a Docker volume named `mongo-data`.
- The application files are mounted into the container for live updates during development.

---

## CSV Format

Ensure the uploaded CSV file has the following headers:

```csv
Date;Time;CO(GT);PT08.S1(CO);NMHC(GT);C6H6(GT);PT08.S2(NMHC);NOx(GT);PT08.S3(NOx);NO2(GT);PT08.S4(NO2);PT08.S5(O3);T;RH;AH;
```

---

## Notes

- MongoDB must be running locally or accessible via the provided `MONGO_URI` (if not using Docker).
- Ensure the CSV file is in the correct format before uploading.

Feel free to explore and extend the app's functionality!

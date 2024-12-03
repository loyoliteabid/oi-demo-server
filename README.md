## Setup Instructions

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v14 or higher recommended).
- **Python**: Install Python (v3.7 or higher recommended) and ensure `pip` is available.

### Steps to Run the Application

### 1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

---

### 2. Install Node.js dependencies:

```bash
    npm install
```

---

### 3. Install Python dependencies:

```bash
    pip install -r src/utils/requirements.txt
```

---

### 4. Start the server:

```bash
    npm run dev
```

Notes
The script automatically checks and installs Python dependencies if missing. Ensure pip is accessible globally.

---

### 5. **Run in Any Environment**

With this setup:

1. The `requirements.txt` ensures the Python dependencies are portable.
2. The script dynamically installs Python dependencies if they aren’t present.
3. Documentation guides users to set up their environment properly.

---

### 6. **Optional Enhancements**

- **Dockerize the App**:
  Create a Docker container to ensure consistent environments. This encapsulates Node.js and Python dependencies within a containerized environment.

- **Virtual Environment**:
  Use a Python virtual environment (`venv`) for isolated Python dependencies. This avoids conflicting system-wide packages.

---

### Summary

By using a `requirements.txt` file and automating dependency installation in `ingestData.ts`, your Python script becomes portable and self-sufficient. Include proper documentation to ensure smooth setup for other developers. Let me know if you'd like help with Dockerizing the project!

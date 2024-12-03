# Use the official Node.js 18 image
FROM node:18

# Update package list and install Python dependencies
RUN apt-get update && apt-get install -y python3-full python3-pip python3-venv

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) and install Node.js dependencies
COPY package*.json ./ 
RUN npm install

# Create a virtual environment for Python
RUN python3 -m venv /app/venv

# Upgrade pip and install Python dependencies in the virtual environment
RUN /app/venv/bin/pip install --upgrade pip
RUN /app/venv/bin/pip install pandas ucimlrepo

# Copy the rest of the application files
COPY . .

# Expose port 5000 (aligned with docker-compose.yml)
EXPOSE 5000

# Start the application (using npm run dev for development mode)
CMD ["npm", "run", "dev"]

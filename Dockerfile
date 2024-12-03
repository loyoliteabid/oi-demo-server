# Use the official Node.js 18 image
FROM node:18

# Install Python 3 and necessary tools
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

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

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]

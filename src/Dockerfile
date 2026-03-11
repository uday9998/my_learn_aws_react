# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
# Note: The build script in package.json builds to 'build' and then moves it to 'served'
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine

WORKDIR /app

# Install serve globally to serve static files
RUN npm install -g serve

# Copy the built assets from the builder stage
COPY --from=builder /app/served ./served

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "served", "-l", "3000"]

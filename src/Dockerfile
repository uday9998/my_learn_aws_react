# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

ENV SKIP_PREFLIGHT_CHECK=true

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

RUN apk add --no-cache \
    curl \
    unzip \
    wget \
    python3 \
    py3-pip \
    groff \
    less \
    && pip3 install --no-cache-dir awscli --break-system-packages \
    && npm install -g serve

# Copy the built assets from the builder stage
COPY --from=builder /app/served ./served

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 3000
EXPOSE 3000

# Entrypoint to fetch secrets / generate .env
ENTRYPOINT ["/entrypoint.sh"]

# Start the application
CMD ["serve", "-s", "served", "-l", "3000"]
# Stage 1: Build Frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend & Serve
FROM node:20-slim
WORKDIR /app

# Cache Buster
ENV BUILD_VERSION=1.0.5

# Install production dependencies for backend
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install --only=production

# Copy backend source
COPY backend/ ./

# Copy built frontend assets from Stage 1
COPY --from=frontend-builder /app/frontend/dist ./public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]

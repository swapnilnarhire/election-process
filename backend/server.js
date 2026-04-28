const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const config = require('./config');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');
const { logger } = require('./middleware/logger');

const app = express();

// Security and Performance Middlewares
app.use(helmet()); // Production Hardening: Security headers
app.use(compression()); // Production Hardening: Compress responses
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigin = isProduction 
  ? (process.env.ALLOWED_ORIGIN || true) // 'true' reflects the request origin
  : 'http://localhost:5173';

app.use(cors({ 
  origin: allowedOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging and Body Parsing Middlewares
app.use(logger);
app.use(express.json());

// API Routes
app.use('/api', routes);

// Serve Static Frontend in Production
if (config.env === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  console.log('[SERVER] Serving frontend via middleware');
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Global Error Handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[SERVER] Running in ${config.env} mode on port ${config.port}`);
});

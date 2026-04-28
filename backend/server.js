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

const isProduction = process.env.NODE_ENV === 'production';

// Security and Performance Middlewares
app.use(helmet({
  contentSecurityPolicy: isProduction ? undefined : false,
  crossOriginResourcePolicy: isProduction ? { policy: 'same-origin' } : false,
}));
app.use(compression()); // Production Hardening: Compress responses
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
];

app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin || !isProduction || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Logging and Body Parsing Middlewares
app.use(logger);
app.use(express.json());

// API Routes
app.use('/api', routes);

// Serve Static Frontend in Production
if (isProduction) {
  const frontendPath = path.resolve(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  app.use((req, res, next) => {
    // If it starts with /api, it should have been handled by previous routes
    if (req.path.startsWith('/api')) return next();
    
    // Otherwise, serve index.html for all frontend routes
    res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
      if (err) {
        // Only log if it's not a 404 for a missing asset (to avoid log noise)
        if (err.status !== 404) {
          console.error('[ERROR] res.sendFile failed:', err);
        }
        next(); // Let the error handler or 404 handler take over
      }
    });
  });
}

// Global Error Handler
app.use(errorHandler);

const server = app.listen(config.port, () => {
  console.log(`[SERVER] Running in ${config.env} mode on port ${config.port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[ERROR] Port ${config.port} is already in use. Please kill the process or use a different port.`);
  } else {
    console.error('[ERROR] Server failed to start:', err);
  }
  process.exit(1);
});

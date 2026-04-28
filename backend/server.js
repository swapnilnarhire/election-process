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
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({ origin: allowedOrigin }));

// Logging and Body Parsing Middlewares
app.use(logger);
app.use(express.json());

// API Routes
app.use('/api', routes);

// Serve Static Frontend in Production
if (config.env === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Global Error Handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[SERVER] Running in ${config.env} mode on port ${config.port}`);
});

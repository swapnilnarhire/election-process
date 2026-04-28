require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
};

// Fail fast if critical environment variables are missing
const requiredVars = ['PORT'];
requiredVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.warn(`[WARNING] Missing environment variable: ${varName}`);
  }
});

module.exports = config;

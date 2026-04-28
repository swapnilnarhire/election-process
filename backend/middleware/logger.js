const morgan = require('morgan');

// Standard morgan format for development, can be adjusted for production
const logger = morgan('dev');

module.exports = { logger };

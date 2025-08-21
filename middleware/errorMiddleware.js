const logger = require('../utils/logger');

exports.errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Log error details
  logger.error(`${req.method} ${req.originalUrl} - ${message} - Stack: ${err.stack}`);

  // Hide stack trace in production
  const response = {
    message,
  };

  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

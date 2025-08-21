require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const tailorRoutes = require('./routes/tailorRoutes');
const customerRoutes = require('./routes/customerRoutes');
const communicationRoutes = require('./routes/communicationRoutes');
const logisticsRoutes = require('./routes/logisticsRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('combined', { stream: logger.stream }));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/tailor', tailorRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/communication', communicationRoutes);
app.use('/api/logistics', logisticsRoutes);

// Health check route
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Graceful shutdown
const gracefulShutdown = () => {
  logger.info('Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      logger.info('MongoDB connection closed.');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  gracefulShutdown();
});

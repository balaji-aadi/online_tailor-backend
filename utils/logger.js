// utils/logger.js
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, "..", "logs");

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: "app-%DATE%.log",
  dirname: logDir,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    dailyRotateFileTransport,
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message) {
    logger.info(message.trim());
  },
};

export default logger;

import winston, { format } from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const { combine, timestamp, printf } = format;

// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Configure Winston transports based on environment
const transports = [];

// Console transport (always enabled in development)
if (
  process.env.NODE_ENV === 'DEVELOPMENT' ||
  process.env.NODE_ENV === 'LOCAL'
) {
  transports.push(
    new winston.transports.Console({
      format: combine(
        winston.format.colorize(),
        winston.format.simple(),
        timestamp(),
        logFormat,
      ),
    }),
  );
}

// File transport (enabled if LOGGING_ENABLED is true)
if (process.env.LOGGING_ENABLED === 'true') {
  transports.push(
    new winston.transports.File({
      filename: process.env.LOG_FILE_PATH,
      format: combine(timestamp(), logFormat),
    }),
  );
}

// Create Winston logger instance
const logger = winston.createLogger({
  transports: transports,
});

export default logger;

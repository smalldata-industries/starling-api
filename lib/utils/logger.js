const winston = require('winston');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const {
  LOGS_ERROR_BASE_PATH,
  LOGS_ERROR_FILE_NAME,
  LOGS_COMBINED_BASE_PATH,
  LOGS_ERROR_COMBINED_FILE_NAME,
} = process.env;

function getWinstonLogger() {
  const logger = winston.createLogger({
    level: process.env.LOGGING_LEVEL || 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({
        filename: `${LOGS_ERROR_BASE_PATH}/${LOGS_ERROR_FILE_NAME}`,
        level: 'error',
      }),
      new winston.transports.File({
        filename: `${LOGS_COMBINED_BASE_PATH}/${LOGS_ERROR_COMBINED_FILE_NAME}`,
      }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    );
  }

  return logger;
}

module.exports = {
  Logger: getWinstonLogger(),
};

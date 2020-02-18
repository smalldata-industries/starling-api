const dotenv = require('dotenv');
const { startApp, stopApp } = require('./app');
const logger = require('./lib/utils/logger').Logger;

dotenv.config({ silent: true });

const PORT = process.env.PORT || 3000;
const READINESS_FAILURE_THRESHOLD = parseInt(process.env.READINESS_FAILURE_THRESHOLD || 2, 10);
const READINESS_PERIOD =
  process.env.NODE_ENV === 'production'
    ? parseInt(process.env.READINESS_PERIOD || 5, 10) * 1000
    : 0;
const SHUTDOWN_TIMEOUT_SECONDS = parseInt(process.env.SHUTDOWN_TIMEOUT_SECONDS || 15, 10) * 1000;
let exiting = false;

startApp().then(app => {
  app.listen(PORT, () => {
    logger.info(`Starling api listening on port: ${PORT}`);
  });
});

function gracefullyShutdown() {
  logger.info('Received SIGINT or SIGTERM');

  if (exiting) {
    return;
  }

  exiting = true;
  logger.info('Attempting to gracefully exit server');

  setTimeout(() => {
    setTimeout(() => {
      logger.error('Could not exit the process in time, exiting forcefully');
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_SECONDS).unref();

    stopApp().then(() => {
      logger.info('Exiting gracefully');
      process.exit(0);
    });
  }, READINESS_FAILURE_THRESHOLD * READINESS_PERIOD + 1);
}

process.on('SIGINT', gracefullyShutdown);
process.on('SIGTERM', gracefullyShutdown);

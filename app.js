require('dotenv').config({ silent: true });

const express = require('express');
const defaultRouter = require('./lib/routers/default');
const authenticatedRouter = require('./lib/routers/authenticated');
const indexRoute = require('./lib/routes/index').index;
const healthCheckRoute = require('./lib/routes/health-check').ping;
const storeRoute = require('./lib/routes/store');
const monitorRoute = require('./lib/routes/monitor');
const listRoute = require('./lib/routes/list');
const verifyRoute = require('./lib/routes/verify');
const jobStatusRoute = require('./lib/routes/jobStatus');
const getRoute = require('./lib/routes/get');
const errorHandler = require('./lib/errors/error-handler');
const ErrStrategies = require('./lib/errors/strategies');
const logger = require('./lib/utils/logger').Logger;

let app;

async function startApp() {
  app = express();
  const appErrorHandler = errorHandler([ErrStrategies.defaultStrategy]);

  app.use('/', indexRoute(defaultRouter()));
  app.use('/ping', healthCheckRoute(defaultRouter()));
  app.use('/api/store', storeRoute(authenticatedRouter()));
  app.use('/api/monitor', monitorRoute(authenticatedRouter()));
  app.use('/api/list', listRoute(authenticatedRouter()));
  app.use('/api/verify', verifyRoute(authenticatedRouter()));
  app.use('/api/jobStatus', jobStatusRoute(authenticatedRouter()));
  app.use('/api/get', getRoute(authenticatedRouter()));

  appErrorHandler(app);
  return app;
}

async function stopApp() {
  logger.info('stopping api');
}

module.exports = {
  startApp,
  stopApp
};

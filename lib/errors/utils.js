const logger = require('../../lib/utils/logger').Logger;

function makeError(message, status) {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
}

function propagateError(next) {
  return error => {
    let err = error;
    let message;
    let status = error.status || 500;
    err.status = status;
    if (error.response) {
      if (error.response.body.message) {
        status = error.response.body.status || 500;
        // eslint-disable-next-line prefer-destructuring
        message = error.response.body.message;
      } else {
        // eslint-disable-next-line prefer-destructuring
        status = error.response.status;
        message = error.response.body;
      }

      err = makeError(message, status);
    } else {
      err = makeError('Unknown Internal Error', 500);
    }

    switch (status) {
      case 500: {
        logger.error(`${err}`);
        break;
      }

      default: {
        break;
      }
    }

    next(err);
  };
}

module.exports = {
  makeError,
  propagateError
};

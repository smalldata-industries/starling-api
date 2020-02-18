const defaultStrategy = function(err, req, res, next) {
  let error;

  if (res.headersSent) {
    next(err);
  }
  if (err.errors) {
    switch (err.errors[0].location) {
      case 'body':
        error = 'body failed schema validation';
        break;
      case 'headers':
        error = 'headers failed schema validation';
        break;
      default:
        error = err.message;
    }
  }

  res.status(err.status || 500);
  res.set('Content-Type', 'application/json');
  res.send({ status: err.status, message: error || err.message });
  next(err);
};

module.exports = {
  defaultStrategy,
};

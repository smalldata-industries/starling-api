// Mapping function handler.
const Handler = function(errorList) {
  const ErrorHandler = function(app) {
    Object.keys(errorList).forEach(key => {
      if ({}.hasOwnProperty.call(errorList, key)) {
        app.use(errorList[key]);
      }
    });
    return app;
  };
  return ErrorHandler;
};

module.exports = Handler;

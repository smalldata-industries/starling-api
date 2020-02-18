const { partial } = require('lodash');
const validate = require('express-validation');
const { store } = require('../apis');
const queryValidation = require('../validation/store');

const validatorAll = validate(queryValidation.verifyQuerySingle);

function storeRoute(router) {
  router.post('/', validatorAll, partial(store));
  return router;
}

module.exports = storeRoute;

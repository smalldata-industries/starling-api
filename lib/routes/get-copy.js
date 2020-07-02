const { partial } = require('lodash');
const { get } = require('../apis');

function getRoute(router) {
  router.get('/:uuid/:copyNumber', partial(get));
  return router;
}

module.exports = getRoute;

const { partial } = require('lodash');
const { list } = require('../apis');

function listRoute(router) {
  router.get('/', partial(list));
  return router;
}

module.exports = listRoute;

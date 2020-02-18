const { partial } = require('lodash');
const { verify } = require('../apis');

function verifyRoute(router) {
  router.get('/', partial(verify));
  return router;
}

module.exports = verifyRoute;

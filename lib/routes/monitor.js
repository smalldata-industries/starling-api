const { partial } = require('lodash');
const { monitor } = require('../apis');

function moitorRoute(router) {
  router.get('/', partial(monitor));
  return router;
}

module.exports = moitorRoute;

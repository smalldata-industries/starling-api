const { partial } = require('lodash');
const { jobStatus } = require('../apis');

function jobStatusRoute(router) {
  router.get('/:id', partial(jobStatus));
  return router;
}

module.exports = jobStatusRoute;

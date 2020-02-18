function getStatus() {
  const statusResponse = {};
  statusResponse.response = 'index';
  return statusResponse;
}

function status(req, res) {
  res.statusCode = 200;
  res.send(getStatus());
  res.end();
}

function index(router) {
  router.get('/', status);
  return router;
}

module.exports = {
  index,
  getStatus,
  status,
};

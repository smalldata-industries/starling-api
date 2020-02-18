function pong(req, res) {
  res.statusCode = 200;
  res.setHeader('content-type', 'text/plain; charset=UTF-8');
  res.send('pong');
}

function ping(router) {
  router.get('/', pong);
  return router;
}

module.exports = {
  pong,
  ping,
};

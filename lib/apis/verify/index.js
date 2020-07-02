const { StarlingCore } = require('../../core');

async function verify(req, res) {
  const core = new StarlingCore();
  const data = await core.verify();
  res.status(200).send(data);
  core.on('ERROR', (error) => {
    res.status(500).send(error);
  });
}

module.exports = {
  verify
};

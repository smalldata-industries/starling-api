const { LotusWsClient } = require('../../core/infrastructure/lotus/LotusWsClient');

const validateFilecoinCnx = async (req, res, next) => {
  try {
    const client = LotusWsClient.shared();
    const version = await client.version();
    next();
  } catch (err) {
    res.status(400).send("couldn't connect to your filecoin node");
  }
};

module.exports = { validateFilecoinCnx };

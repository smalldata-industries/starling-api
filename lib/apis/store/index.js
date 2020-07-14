const { Logger } = require('../../utils');
const { connect, close } = require('../../db');
const {
  ProposeDeals
} = require('./controller/store');
const { StarlingCore } = require('../../core');

async function store(req, res) {
  try {
    const { dataPath } = req.body;

    const core = new StarlingCore();
    const noOfCopies = parseInt(process.env.COPY_NUMBER, 10);
    const price = parseInt(process.env.PRICE, 10);
    const encryptionKey = process.env.ENCRYPTION_KEY;
    await core.store(dataPath, price, noOfCopies, encryptionKey);

    res.status(200).json({
      path: dataPath
    });
  } catch (err) {
    Logger.error(err.stack ? err.stack : err);
    res.status(500).send(err.stack ? err.stack : err);
  }
}

module.exports = {
  store
};

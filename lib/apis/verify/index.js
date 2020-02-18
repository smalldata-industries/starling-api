const { connect, close, getStorageDeals, getVerifyList } = require('../../db');
const { Logger } = require('../../utils');
const { updateDealStatus } = require('./controller/verify');

async function verify(req, res) {
  let db;

  try {
    db = await connect();

    await getStorageDeals(db, async data => {
      await updateDealStatus(db, data);

      getVerifyList(db, verifyData => {
        res.status(200).send({ verifyData });
        close(db);
      });
    });
  } catch (err) {
    Logger.error(err.stack ? err.stack : err);
    res.status(500).send(err.stack ? err.stack : err);
  }
}

module.exports = {
  verify
};

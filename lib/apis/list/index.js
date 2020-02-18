const { connect, close, getStoredFileList } = require('../../db');
const { Logger } = require('../../utils');

async function list(req, res) {
  try {
    const db = await connect();

    getStoredFileList(db, data => {
      res.status(200).send({ data });
    });

    close(db);
  } catch (err) {
    Logger.error(err.stack ? err.stack : err);
    res.status(500).send(err.stack ? err.stack : err);
  }
}

module.exports = {
  list
};

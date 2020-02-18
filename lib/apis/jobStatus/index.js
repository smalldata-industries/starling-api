const { connect, close, updateFileStatus } = require('../../db');
const { Logger } = require('../../utils');
const { fc } = require('../../validation/filecoinStatus');
const { getJobStatusInfo } = require('./controller/jobStatus');

async function jobStatus(req, res) {
  let db;

  try {
    db = await connect();
    const { id } = req.params;

    await getJobStatusInfo(db, id, res);

    close(db);
  } catch (err) {
    close(db);
    Logger.error(err.stack ? err.stack : err);
    res.status(500).send(err.stack ? err.stack : err);
  }
}

module.exports = {
  jobStatus
};

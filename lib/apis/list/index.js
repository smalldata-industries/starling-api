const { connect, close, getStoredFileList } = require('../../db');
const { Logger } = require('../../utils');
const { StarlingCore } = require('../../core');

async function list(req, res) {
  try {
    const core = new StarlingCore();
    const { jobs } = await core.getListReport();

    res.status(200).send({ data: jobs });
  } catch (err) {
    Logger.error(err.stack ? err.stack : err);
    res.status(500).send(err.stack ? err.stack : err);
  }
}

module.exports = {
  list
};

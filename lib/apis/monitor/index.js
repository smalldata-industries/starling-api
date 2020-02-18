const { Logger } = require('../../utils');
const { connect, close } = require('../../db');
const { getMonitorData } = require('./controller/monitor');

async function monitor(req, res) {
  let db;

  try {
    db = await connect();

    const monitorData = await getMonitorData(db);

    if (monitorData) {
      close(db);
    }

    res.status(200).send(monitorData);
  } catch (err) {
    close(db);
    Logger.error(err.stack ? err.stack : err);
    res.status(500).send(err.stack ? err.stack : err);
  }
}

module.exports = {
  monitor
};

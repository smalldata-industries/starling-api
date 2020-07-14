const { Logger } = require('../../utils');
const { getMonitorData } = require('./controller/monitor');

async function monitor(req, res) {
  try {

    const monitorData = await getMonitorData();
    res.status(200).send(monitorData);
  } catch (err) {
    Logger.error(err.stack ? err.stack : err);
    res.status(500).send(err);
  }
}

module.exports = {
  monitor
};

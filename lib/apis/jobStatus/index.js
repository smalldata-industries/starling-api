const { Logger } = require('../../utils');
const { getJobStatusInfo } = require('./controller/jobStatus');

async function jobStatus(req, res) {
  try {
    const { id } = req.params;
    const data = await getJobStatusInfo(id);
    res.status(200).json(data);
  } catch (err) {
    Logger.error(err.stack ? err.stack : err);
    res.status(500).json({ message: err.message || `Couldn't get job status` });
  }
}

module.exports = {
  jobStatus
};

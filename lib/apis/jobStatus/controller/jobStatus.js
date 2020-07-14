
const { Logger, convertDate } = require('../../../utils');
const { connect, close, updateFileStatus, getJobStatus } = require('../../../core/infrastructure/db');
const { StarlingCore } = require('../../../core');

async function getJobStatusInfo(id) {
    const core = new StarlingCore();
    const { jobs } = await core.getListReport();
    const jobArray = jobs.filter(job => job.uuid === id);

    if (jobArray.length === 0) {
      throw new Error('Job not found');
    }

    return {
      ...jobs[0],
    }

}

module.exports = {
  getJobStatusInfo
};

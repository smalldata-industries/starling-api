const { connect, close, updateFileStatus, getJobStatus } = require('../../../db');
const { Logger, convertDate } = require('../../../utils');
const { fc } = require('../../../validation/filecoinStatus');

async function getJobStatusInfo(db, id, res) {
  try {
    let status;
    const storageDeal = await fc.client.queryStorageDeal(id);
    const { state } = storageDeal;

    await getJobStatus(db, id, async data => {
      const { STATE, NAME, DATETIME_STARTED, SIZE, STATUS } = data[0];

      res.status(200).send({
        data: {
          type: STATE,
          content: {
            name: NAME,
            size: SIZE,
            elapsedTime: convertDate(DATETIME_STARTED)
          },
          status: STATUS
        }
      });
    });
  } catch (err) {
    Logger.error(err.stack);
  }
}

module.exports = {
  getJobStatusInfo
};

const { updateFileStatus } = require('../../../db');
const { Logger } = require('../../../utils');
const { fc } = require('../../../validation/filecoinStatus');

async function updateDealStatus(db, data) {
  try {
    await Promise.all(
      data.map(async deal => {
        const { dealId, cid, copyNumber, commDOld } = deal;
        const init = !commDOld;

        const storageDeal = await fc.client.queryStorageDeal(dealId);

        const {
          state,
          proofInfo: { commD, commR, commRStar }
        } = storageDeal;

        const fixityResult = commD === commDOld ? 'pass' : 'FAIL';

        updateFileStatus(db, cid, copyNumber, state, commD, commR, commRStar, fixityResult, init);
      })
    );
  } catch (err) {
    Logger.error(err.stack);
  }
}

module.exports = {
  updateDealStatus
};

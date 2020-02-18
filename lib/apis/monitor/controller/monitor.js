const { Logger, formatBytes } = require('../../../utils');
const {
  getStorageSpace,
  getQueuedFileList,
  getActiveFileList,
  getStorageDeals,
  updateFileStatus
} = require('../../../db');
const { getMiners } = require('../../store/controller/store');
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

async function getMonitorData(db) {
  let space;
  let queued;
  let active;

  await getStorageDeals(db, async data => {
    await updateDealStatus(db, data);
  });
  getStorageSpace(db, data => {
    space = data;
  });
  getQueuedFileList(db, data => {
    queued = data;
  });
  getActiveFileList(db, data => {
    active = data;
  });

  const miners = await getMiners(fc);
  const walletAddress = (await fc.address.ls())[0];
  const walletBalance = await fc.wallet.balance(walletAddress);

  return Promise.resolve({
    filesStored: active.length || 'N/A',
    totalMiners: miners.length,
    totalStorageUsed: formatBytes(space),
    walletBalance,
    queuedJobs: {
      totalQueued: queued.length,
      queued
    },
    activeJobs: {
      totalActive: active.length,
      active
    }
  });
}

module.exports = {
  getMonitorData
};

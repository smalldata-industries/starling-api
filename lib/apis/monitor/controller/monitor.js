const { Logger, formatBytes } = require('../../../utils');
const {
  getStorageDeals,
  updateFileStatus,
  connect
} = require('../../../core/infrastructure/db');
const { LotusWsClient } = require('../../../core/infrastructure/lotus/LotusWsClient');
const { StarlingCore } = require('../../../core');

async function updateDealStatus(client, db, data) {
  try {
    await Promise.all(
      data.map(async deal => {
        const { dealId, cid, copyNumber, commD_old } = deal;
        const init = commD_old ? false : true;
        const storageDeal = await client.clientGetDealInfo(JSON.parse(dealId));

        await updateFileStatus(
          db,
          cid,
          copyNumber,
          storageDeal.State,
          '',
          '',
          '',
          '',
          init
        );
      })
    );
  } catch (err) {
    console.log(err);
    Logger.error(err);
  }
}

async function getMonitorData() {
  const client = LotusWsClient.shared();
  const db = await connect();
  const storageDeals = await getStorageDeals(db);
  await updateDealStatus(client, db, storageDeals);

  const core = new StarlingCore();
  core.on('ERROR', error => {
    if (!error) {
      throw new Error('Error occured');
    } else if (error.message) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error(`Error: ${error}`);
    }
  });
  const data = await core.getReport();

  return {
    ...data,
    miners: data.miners.length,
  };
}

module.exports = {
  getMonitorData
};

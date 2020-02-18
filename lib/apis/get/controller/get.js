const fs = require('fs-extra');
const splitFile = require('split-file');
const path = require('path');
const { getRetrievalFileInfo } = require('../../../db');
const { Logger } = require('../../../utils');
const { fc } = require('../../../validation/filecoinStatus');

async function downloadFile(db, uuid) {
  try {
    await getRetrievalFileInfo(db, uuid, async data => {
      const numberOfFiles = data.length;
      const files = [];

      await data.map(async (file, index) => {
        const { CID, NAME, MINER_ID } = file;
        let downloadedData;

        files.push(NAME);

        Logger.info(`started downloading ${NAME}`);

        const pieceData = fc.retrievalClient.retrievePiece(MINER_ID, CID);

        downloadedData = Buffer.alloc(0);

        for await (const chunk of pieceData) {
          downloadedData = Buffer.concat([data, chunk]);
        }

        fs.writeFile(NAME, data, err => {
          if (err) {
            Logger.error(err.stack);
          }
          Logger.info(`${NAME} saved successfully!`);
        });

        if (numberOfFiles > 1 && index === numberOfFiles - 1) {
          const fileName = NAME.split(/\.(?=[^.]+$)/)[0];
          splitFile
            .mergeFiles(files, path.join(__dirname, fileName))
            .then(() => {})
            .catch(err => {
              Logger.error(err.stack);
            });
        }
      });
    });

    return Promise.resolve('download complete');
  } catch (err) {
    Logger.error(err.stack);
    throw new Error('error downloading the file');
  }
}

module.exports = {
  downloadFile
};

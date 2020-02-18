const fs = require('fs-extra');
const path = require('path');
const { sortBy, size, filter, map } = require('lodash');
const splitFile = require('split-file');
const uuidv4 = require('uuid/v4');

const { Logger } = require('../../../utils');
const { updateFile, insertFile } = require('../../../db');
const { dealTime } = require('../../../constants/deals');
const { formatBytes } = require('../../../utils/formatBytes');
const { fc } = require('../../../validation/filecoinStatus');

const COPY_NUMBER = parseInt(process.env.COPY_NUMBER, 10);

async function getInfo(arg) {
  const stats = await fs.stat(arg);

  const fileSize = stats.size;
  const name = path.basename(arg);

  if (stats.isFile()) {
    return Promise.resolve({ status: 'file', name, fileSize });
  }
  if (stats.isDirectory()) {
    return Promise.resolve({
      status: 'directory',
      name,
      fileSize
    });
  }
}

async function checkFileDirectory(dataPath) {
  try {
    return await getInfo(dataPath);
  } catch (err) {
    return Promise.reject('no such file or directory');
  }
}

async function split(db, originalFile, totalCopies) {
  try {
    const splitFiles = await splitFile.splitFileBySize(originalFile, 20971520);
    const dirname = path.dirname(originalFile);
    const splitUuid = uuidv4();

    const splitFilesInfo = await Promise.all(splitFiles.map(file => getInfo(file)));

    return await Promise.all(
      splitFilesInfo.map(file => {
        const { name } = file;

        return importFile(db, dirname + name, file, totalCopies, splitUuid);
      })
    );
  } catch (err) {
    return Promise.reject(err);
  }
}

async function importFile(db, file, { name, fileSize }, totalCopies, splitUuid) {
  if (fileSize <= 20971520) {
    const data = Buffer.from(file);
    const cid = await fc.client.import(data);
    const formattedSize = formatBytes(fileSize);

    for (let i = 0; i < COPY_NUMBER; i++) {
      const uuid = uuidv4();
      insertFile(db, uuid, cid, name, fileSize, formattedSize, i + 1);
    }
    return [{ cid, fileSize, name }];
  }
  return await split(db, file, COPY_NUMBER);
}

async function importFiles(db, { status, name, fileSize }, dataPath) {
  const formattedSize = formatBytes(fileSize);

  if (status === 'file') {
    return await importFile(db, dataPath, { name, fileSize }, COPY_NUMBER);
  }
  if (status === 'directory') {
    Logger.info(`\nThis is directory ${name} of size ${formattedSize}`);

    const files = await fs.readdir(dataPath);
    const allFilesInfo = await Promise.all(files.map(file => getInfo(`${dataPath}/${file}`)));

    return await Promise.all(
      files.map((file, index) =>
        importFile(db, `${dataPath}/${file}`, allFilesInfo[index], COPY_NUMBER)
      )
    );
  }
}

async function getMiners() {
  const list = [];

  for await (const item of fc.client.listAsks()) {
    list.push(item);
  }

  return sortBy(list, ['price']);
}

function updateFileDB(db, name, deal, index) {
  updateFile(db, name, deal, index);
}

async function proposeDeal(db, { cid, name }, miners, index) {
  for (let i = 0; i < size(miners); i + 1) {
    Logger.info(`storing ${name} with miner ${miners[i].miner}`);

    try {
      const storageDealProposal = await fc.client.proposeStorageDeal(
        miners[i].miner,
        cid,
        miners[i].id,
        dealTime,
        { allowDuplicates: true }
      );

      const deal = {
        dealID: storageDealProposal.proposalCid,
        minerID: miners[i].miner,
        signature: storageDealProposal.signature,
        state: storageDealProposal.state,
        CID: cid
      };

      Logger.info(storageDealProposal);

      updateFileDB(db, name, deal, index + 1);

      return Promise.resolve({ deal: 'accepted', dealID: deal.dealID, name });
    } catch (err) {
      if (err.code === 'ECONNREFUSED') {
        break;
      }
      Logger.error(err.stack);
      continue;
    }
  }
}

async function ProposeDeals(db, importedFiles, miners, res) {
  const filesCount = importedFiles.length;

  const acceptedDeals = [];
  const dealIDs = [];

  for (let i = 0; i < COPY_NUMBER; i++) {
    const deals = await Promise.all(
      importedFiles.map(file => {
        const FILE = filesCount === 1 ? file : file[0];

        return proposeDeal(db, FILE, miners, i);
      })
    );

    dealIDs.push(map(deals, ({ dealID, name }) => ({ dealID, name })));

    const accepted = filter(deals, { deal: 'accepted' }).length;

    if (accepted === filesCount) {
      acceptedDeals[i] = { deal: 'full' };
    } else if (accepted > 0) {
      acceptedDeals[i] = { deal: 'partial' };
    } else {
      acceptedDeals[i] = { deal: 'failed' };
    }
  }

  const full = filter(acceptedDeals, { deal: 'full' }).length;
  const partial = filter(acceptedDeals, { deal: 'partial' }).length;
  const failed = filter(acceptedDeals, { deal: 'failed' }).length;

  let message;

  if (full === COPY_NUMBER) {
    message = 'all storage deals successfully made!';
  } else if (partial > 0 && full > 0) {
    message = `Only enough deals were made to store ${full} complete copies`;
  } else if (full === 0 && partial > 0) {
    message = 'Only enough deals were made to store some of your files';
  } else if (failed === COPY_NUMBER) {
    message = 'No one accepted your storage proposals!';
  }

  const response = {
    data: {
      message,
      dealIDs
    }
  };

  res.status(200).send(response);
}

async function cleanImportedFiles(files) {
  const data = [];

  if (files.length === 1) {
    return Promise.resolve(files);
  }

  files.map(file => {
    if (file.length === 1) {
      data.push(file);
    } else {
      file.map(FILE => {
        data.push(FILE);
      });
    }
  });

  return Promise.resolve(data);
}

module.exports = {
  getMiners,
  checkFileDirectory,
  importFiles,
  cleanImportedFiles,
  ProposeDeals
};

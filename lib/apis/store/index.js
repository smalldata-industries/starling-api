const { Logger } = require('../../utils');
const { connect, close } = require('../../db');
const {
  checkFileDirectory,
  cleanImportedFiles,
  getMiners,
  importFiles,
  ProposeDeals
} = require('./controller/store');

async function store(req, res) {
  try {
    const { dataPath } = req.body;

    const argInfo = await checkFileDirectory(dataPath);
    const db = await connect();

    const miners = await getMiners();

    const importedFiles = await importFiles(db, argInfo, dataPath);

    const files = await cleanImportedFiles(importedFiles);

    Logger.info(`\nIMPORTED FILES:\n`);
    Logger.info(files);

    close(db);

    await ProposeDeals(db, files, miners, res);
  } catch (err) {
    Logger.error(err.stack ? err.stack : err);
    res.status(500).send(err.stack ? err.stack : err);
  }
}

module.exports = {
  store
};

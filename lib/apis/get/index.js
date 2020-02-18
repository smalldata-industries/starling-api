const fs = require('fs-extra');
const splitFile = require('split-file');
const path = require('path');
const { connect, close, getRetrievalFileInfo } = require('../../db');
const { Logger } = require('../../utils');
const { fc } = require('../../validation/filecoinStatus');
const { downloadFile } = require('./controller/get');

async function get(req, res) {
  let db;

  try {
    db = await connect();
    const { uuid } = req.params;

    await downloadFile(db, uuid);

    res.status(200).send({
      data: {
        message: 'started downloading your file'
      }
    });

    close(db);
  } catch (err) {
    Logger.error(err.stack ? err.stack : err);
    res.status(500).send(err.message ? err.message : err);
  }
}

module.exports = {
  get
};

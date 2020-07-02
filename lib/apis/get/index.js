const { Logger } = require('../../utils');
const { StarlingCore } = require('../../core');


async function get(req, res) {
  try {
    const { uuid, copyNumber } = req.params;
    const path = process.env.IPFS_ROOT;
    const encryptionKey = process.env.ENCRYPTION_KEY;

    const core = new StarlingCore();
    core.get(uuid, path, copyNumber, encryptionKey)

    res.status(200).json({ status: 'ok' });
  } catch (err) {
    Logger.error(err.stack ? err.stack : err);
    res.status(500).send(err.stack ? err.stack : err);
  }
}

module.exports = {
  get
};

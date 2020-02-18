const Filecoin = require('filecoin-api-client');

const { apiAddr } = process.env;

const fc = apiAddr
  ? Filecoin({
      apiAddr
    })
  : Filecoin({ apiAddr: '/ip4/127.0.0.1/tcp/3453/http' });

const validateFilecoinCnx = async (req, res, next) => {
  try {
    await fc.id();
    next();
  } catch (err) {
    res.status(400).send("couldn't connect to your filecoin node");
  }
};

module.exports = { validateFilecoinCnx, fc };

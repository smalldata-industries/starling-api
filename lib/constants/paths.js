const homedir = require('os').homedir();

const dbPath = `${homedir}/.starling/starling.db`;

module.exports = {
  dbPath
};

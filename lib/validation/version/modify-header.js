const { parseType, parseVendor, parseVersion } = require('../../utils/util');

const modifyHeader = (req, res, next) => {
  const acceptHeader = req.headers.accept.split('/')[1];
  const [vend, ver] = acceptHeader.split(';');

  req.accept = {
    version: parseVersion(ver),
    type: parseType(vend),
    vendor: parseVendor(vend),
  };

  next();
};

module.exports = modifyHeader;

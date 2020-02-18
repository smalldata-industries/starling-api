const parseVersion = ver => {
  const version = ver.split('=')[1];
  return version;
};

const parseVendor = vend => {
  const vendor = vend.split('+')[0];
  return vendor;
};

const parseType = vend => {
  const vendor = vend.split('+')[1] || 'json';
  return vendor;
};

module.exports = {
  parseVersion,
  parseVendor,
  parseType,
};

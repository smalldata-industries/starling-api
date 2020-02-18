const validateVersion = (req, res, next) => {
  const ver = parseInt(req.accept.version, 10);

  if (ver >= 1) {
    next();
  } else {
    res.sendStatus(301);
  }
};

module.exports = validateVersion;

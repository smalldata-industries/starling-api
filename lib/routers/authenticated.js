const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const validate = require('express-validation');

const { validateVersion, verionHeader, modifyHeader } = require('../validation/version');
const { validateFilecoinCnx } = require('../validation/filecoinStatus');

const authenticatedRouter = function() {
  const router = new express.Router();
  router.use(cors());
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
  router.use(bodyParser.json({ limit: '1mb' }));
  router.use(express.static('public'));

  validate.options({
    status: 400,
    statusText: 'Invalid data not matching schema',
    allowUnknownBody: false,
    allowUnknownQuery: true,
    allowUnknownCookies: false
  });

  router.all(
    '/*',
    validate(verionHeader),
    validateFilecoinCnx,
    modifyHeader,
    validateVersion,
    (req, res, next) => {
      res.statusCode = 200;
      next();
    }
  );

  return router;
};

module.exports = authenticatedRouter;

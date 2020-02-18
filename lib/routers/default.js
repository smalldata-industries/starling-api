const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const DefaultRouter = function() {
  const router = new express.Router();
  router.use(cors());
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
  router.use(bodyParser.json({ limit: '1mb' }));
  router.use(express.static('public'));

  return router;
};

module.exports = DefaultRouter;

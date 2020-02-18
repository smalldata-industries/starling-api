const Joi = require('joi');

module.exports = {
  body: {
    dataPath: Joi.string(),
  },
};

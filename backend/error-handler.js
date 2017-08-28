const log = require('./log');
const _ = require('lodash');

module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const message = err.message;
  const status = err.status || 500;
  const error = _.pick(err, ['name', 'message', 'stack']);
  log.error(message, { error });
  res.status(status).send(error);
};

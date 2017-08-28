const winston = require('winston');

const LOG_LEVEL_MAP = {
  test: 'error',
  production: 'info',
  development: 'debug',
};
const level = LOG_LEVEL_MAP[process.env.NODE_ENV] || 'debug';

module.exports = new winston.Logger({
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      json: true,
      stderrLevels: [],
      level,
    }),
  ],
  exitOnError: false,
});

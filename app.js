const express = require('express');
const log = require('./log');

const app = express();

app.get('/', (req, res) => {
  log.info('Request landing page');
  res.send('Kubernetes Demo');
});

app.listen(3000, () => {
  log.info('Listening on port 3000');
});

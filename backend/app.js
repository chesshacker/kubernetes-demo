const express = require('express');
const cors = require('cors');
const fs = require('fs');
const log = require('./log');
const errorHandler = require('./error-handler');
const Api = require('kubernetes-client');
const _ = require('lodash');

const app = express();

const { KUBERNETES_SERVICE_HOST, KUBERNETES_SERVICE_PORT } = process.env;
const k8sUrl = `https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}`;
const core = new Api.Core({
  url: k8sUrl,
  ca: fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/ca.crt'),
  auth: {
    bearer: fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/token'),
  },
});

app.use(cors());

app.get('/ping', (req, res, next) => {
  log.info('Ping');
  // res.json(process.env);
  core.ns.po.get((err, result) => {
    if (err) { next(err); }
    const hostname = process.env.HOSTNAME || 'null';
    const pods = result.items.map(item => ({
      name: _.get(item, 'metadata.name'),
      creationTimestamp: _.get(item, 'metadata.creationTimestamp'),
      image: _.get(item, 'spec.containers[0].image'),
    }));
    res.json({ hostname, pods });
  });
});

app.use(express.static('../frontend/build'));

app.use(errorHandler);

app.listen(3000, () => {
  log.info('Listening on port 3000');
});

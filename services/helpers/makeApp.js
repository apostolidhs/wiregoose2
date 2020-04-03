const express = require('express');
const compression = require('compression');
const morganLogger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const isProduction = process.env.NODE_ENV === 'production';

const createApp = ({port, host, logger, allowOrigin = '*'}) => {
  const app = express();

  app.set('host', host);
  app.set('port', port);
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', allowOrigin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,authorization');
    next();
  });
  app.use(compression());
  app.use(morganLogger(isProduction ? 'combined' : 'dev', {stream: logger.stream}));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(helmet());

  app.use((err, req, res, next) => res.status(500).send(isProduction ? 'Server Error' : err.message));

  return app;
};

module.exports = createApp;

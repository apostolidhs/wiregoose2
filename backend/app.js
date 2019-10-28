const express = require('express');
const compression = require('compression');
const logger = require('morgan');
const bodyParser = require('body-parser');
const lusca = require('lusca');
const errorHandler = require('errorhandler');

const crawler = require('./crawler');

const createApp = () => {
  const app = express();

  app.set('host', process.env.HOST);
  app.set('port', process.env.PORT);
  app.use(compression());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(lusca.xframe('SAMEORIGIN'));
  app.use(lusca.xssProtection(true));
  app.disable('x-powered-by');

  app.get('/', (req, res) => res.send('Hello World!'));

  if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
  } else {
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).send('Server Error');
    });
  }

  return app;
};

module.exports = createApp;

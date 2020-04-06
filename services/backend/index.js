if (NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config({path: '.env'});
}

const {connect} = require('../helpers/mongoose');
const timelineRoutes = require('./routes/timeline');
const registrationRoutes = require('./routes/registration');
const providerRoutes = require('./routes/provider');
const feedRoutes = require('./routes/feed');
const makeApp = require('../helpers/makeApp');
const logger = require('./logger');

connect();

const host = 'http://localhost';
const app = makeApp({port: process.env.BACKEND_PORT, host, logger});

timelineRoutes(app);
registrationRoutes(app);
feedRoutes(app);
providerRoutes(app);

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`✓ Web server is running at ${host}:${process.env.BACKEND_PORT} in ${process.env.NODE_ENV} mode`);
});

module.exports = app;

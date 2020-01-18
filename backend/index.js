const dotenv = require('dotenv');
dotenv.config({path: '.env'});

const {connect} = require('../helpers/mongoose');
const createApp = require('./app');
const timelineRoutes = require('./routes/timeline');
const registrationRoutes = require('./routes/registration');
const feedRoutes = require('./routes/feed');

connect();

const app = createApp();

timelineRoutes(app);
registrationRoutes(app);
feedRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`✓ Web server is running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

module.exports = app;

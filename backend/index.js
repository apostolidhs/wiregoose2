const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const {connect} = require('./mongoose');
const createApp = require('./app');
const timelineRoutes = require('./routes/timeline');
const registrationRoutes = require('./routes/registration');

const crawler = require('./crawler');
connect().then(() => {
  // crawler();
});

const app = createApp();

timelineRoutes(app);
registrationRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`✓ App is running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

module.exports = app;

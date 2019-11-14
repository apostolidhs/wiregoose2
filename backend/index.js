const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const {connect} = require('./mongoose');
const createApp = require('./app');

const crawler = require('./crawler');
const Registration = require('./models/registration');
connect().then(async () => {
  // const reg = await Registration.findById('5dc073c84df41d751ad24a4e');
  await crawler();
});

const app = createApp();

app.listen(process.env.PORT, () => {
  console.log(`✓ App is running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

module.exports = app;

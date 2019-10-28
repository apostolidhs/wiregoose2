const dotenv = require('dotenv');
const mongoose = require('mongoose');
const createApp = require('./app');

dotenv.config({path: '.env'});

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.connection.on('error', error => {
//   console.error(error);
//   console.log('✗ MongoDB connection error. Please make sure MongoDB is running.');
//   process.exit();
// });
// mongoose.connection.once('open', () => {
//   console.log('✓ connected to mongodb');
// });

// const app = createApp();

// app.listen(process.env.PORT, () => {
//   console.log(`✓ App is running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
// });

// module.exports = app;

const mongoose = require('mongoose');

const connect = () =>
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => console.log('✓ connected to mongodb'))
    .catch(error => {
      console.error(error);
      console.log('✗ MongoDB connection error. Please make sure MongoDB is running.');
      process.exit();
    });

const drop = () => mongoose.connection.db.dropDatabase();

module.exports = {connect, drop};

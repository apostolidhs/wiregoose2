const {Schema} = require('mongoose');

module.exports = new Schema({
  message: String,
  created: Date
});

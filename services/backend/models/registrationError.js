const {Schema, model} = require('mongoose');

const schema = new Schema({
  message: String,
  created: Date
});

module.exports = {
  model: model('RegistrationError', schema),
  schema
};

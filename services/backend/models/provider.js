const {Schema, model} = require('mongoose');

const schema = new Schema({
  name: {type: String, required: true, index: true, unique: true, maxlength: [64]},
  link: {type: String, required: true},
  icon: {type: String, required: true}
});

module.exports = model('Provider', schema);

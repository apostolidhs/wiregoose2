const {Schema, model, SchemaTypes} = require('mongoose');
require('mongoose-type-url');

const schema = new Schema({
  name: {type: String, required: true, index: true, unique: true, maxlength: [64]},
  link: {type: SchemaTypes.Url, required: true},
  icon: {type: SchemaTypes.Url, required: true}
});

module.exports = model('Provider', schema);

const mongoose = require('mongoose');
const mongooseIdValidator = require('mongoose-id-validator');
require('mongoose-type-url');
const {languages, categories} = require('../../config');

const schema = new mongoose.Schema({
  category: {type: String, enum: categories, required: true},
  link: {type: mongoose.SchemaTypes.Url, required: true},
  lang: {type: String, enum: languages, required: true},
  provider: {type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true}
});

const autopopulate = function(next) {
  this.populate('provider');
  next();
};

schema.pre('findOne', autopopulate).pre('find', autopopulate);
schema.plugin(mongooseIdValidator);

module.exports = mongoose.model('Registration', schema);

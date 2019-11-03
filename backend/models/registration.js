const {Schema, model, SchemaTypes} = require('mongoose');
const mongooseIdValidator = require('mongoose-id-validator');
require('mongoose-type-url');
const {languages, categories} = require('../../config');

const schema = new Schema({
  category: {type: String, enum: categories, required: true},
  link: {type: SchemaTypes.Url, required: true},
  lang: {type: String, enum: languages, required: true},
  provider: {type: Schema.Types.ObjectId, ref: 'Provider', required: true},

  total: [Number],
  accepted: [Number],
  stored: [Number],
  lastCrawl: {type: Date},
  isCrawling: {type: Boolean, default: false},
  crawlStarted: {type: Date},
  error: {type: String, enum: ['UNKNOWN']},
  errorDetails: String
});

const autopopulate = function(next) {
  this.populate('provider');
  next();
};

schema.pre('findOne', autopopulate).pre('find', autopopulate);
schema.plugin(mongooseIdValidator);

module.exports = model('Registration', schema);

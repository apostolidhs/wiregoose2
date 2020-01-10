const {Schema, model, SchemaTypes} = require('mongoose');
require('mongoose-type-url');

const schema = new Schema({
  content: {type: String},
  contentLength: {type: Number},
  title: {type: String},
  byline: {type: String},
  error: {code: {type: Number}, msg: {type: String}},
  link: {type: SchemaTypes.Url, required: true},
  feed: {type: SchemaTypes.ObjectId, ref: 'Feed', required: true, index: true},
  createdAt: {type: Date, expires: +process.env.ARTICLE_EXPIRATION}
});

const autopopulate = function(next) {
  this.populate('feed');
  next();
};

schema.pre('findOne', autopopulate).pre('find', autopopulate);

module.exports = model('Article', schema);

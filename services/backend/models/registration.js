const {Schema, model, SchemaTypes} = require('mongoose');
const mongooseIdValidator = require('mongoose-id-validator');
const dateFns = require('date-fns');
const {languages, categories} = require('../../../src/config');
const ErrorSchema = require('./registrationError');
const Provider = require('./provider');

const categoryByIndex = categories.reduce((h, category, index) => ({...h, [category]: index}), {});

const schema = new Schema({
  category: {type: String, enum: categories, required: true},
  link: {type: String, required: true},
  lang: {type: String, enum: languages, required: true},
  provider: {type: Schema.Types.ObjectId, ref: Provider.modelName, required: true},

  total: [Number],
  accepted: [Number],
  stored: [Number],

  failures: [ErrorSchema],

  lastCrawl: {type: Date},
  isCrawling: {type: Boolean, default: false}
});

schema.methods.start = function() {
  this.isCrawling = true;
  return this.save();
};

schema.methods.stop = function() {
  this.isCrawling = false;
  this.lastCrawl = new Date();
  return this.save();
};

const statisticsLength = 366 / 2;

schema.methods.addStats = function({stored, total, accepted}) {
  const shouldAdd = dateFns.getDay(new Date()) % 2 === 0;
  if (shouldAdd) {
    this.stored = [0, ...this.stored].slice(0, statisticsLength);
    this.total = [0, ...this.total].slice(0, statisticsLength);
    this.accepted = [0, ...this.accepted].slice(0, statisticsLength);
  }

  this.stored[0] = this.stored[0] + stored;
  this.total[0] = this.total[0] + total;
  this.accepted[0] = this.accepted[0] + accepted;
};

schema.methods.addError = function(error) {
  this.failures.push(
    new ErrorSchema({
      message: error.toString(),
      created: new Date()
    })
  );
};

schema.methods.toJsonSafe = function() {
  return {...this.toJSON(), _id: undefined, id: this.id, category: categoryByIndex[this.category]};
};

schema.statics.getNext = async function() {
  const currentCrawling = await this.findOne({isCrawling: true}).populate('provider');
  if (currentCrawling) return currentCrawling;

  const lastCrawling = await this.find()
    .sort({lastCrawl: 1})
    .limit(1)
    .populate('provider');
  return lastCrawling[0];
};

// const autopopulate = function(next) {
//   this.populate('provider');
//   next();
// };
// schema.pre('findOne', autopopulate).pre('find', autopopulate);
schema.plugin(mongooseIdValidator);

module.exports = model('Registration', schema);

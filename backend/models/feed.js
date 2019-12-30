const {Schema, model, SchemaTypes} = require('mongoose');
require('mongoose-type-url');
const dateFns = require('date-fns');
const objectHash = require('object-hash');
const {languages, categories} = require('../../src/config');
const Registration = require('./registration');

const validateTitle = {
  message: 'description or image is required',
  validator: function() {
    return !!(this.image || this.description);
  }
};

const schema = new Schema(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
      maxlength: [64],
      default: function() {
        const months = dateFns.differenceInMonths(this.published, new Date(0));
        return objectHash({
          title: this.title,
          description: this.description,
          image: this.image,
          registration: this.registration.toString(),
          date: Math.round(months / 4)
        });
      }
    },
    title: {type: String, required: true, minlength: [6], maxlength: [128], validate: validateTitle},
    image: {type: SchemaTypes.Url},
    description: {type: String, minlength: [15], maxlength: [256]},
    published: {type: Date, required: true},
    link: {type: SchemaTypes.Url, required: true},
    lastHit: {type: Date},
    hits: {type: Number, default: 0},
    category: {type: String, enum: categories, required: true},
    lang: {type: String, enum: languages, required: true},
    author: {type: String, maxlength: [128]},
    // this should be {type: ObjectId, ref: 'RssProvider', required: true}
    // but we really need the speed, part 1 :)
    provider: {type: String, required: true},
    // this should be {type: ObjectId, ref: 'Registration', required: true, populate: true}
    // but we really need the speed, part 2 :)
    registration: {type: Schema.Types.ObjectId, ref: Registration.modelName, required: true}

    // article: {type: Schema.Types.ObjectId, ref: 'Article'}
  },
  {timestamps: true}
);

schema.statics.saveFeeds = function(feeds) {
  return this.insertMany(
    feeds.map(f => f.toObject()),
    {ordered: false}
  );
};

module.exports = model('Feed', schema);

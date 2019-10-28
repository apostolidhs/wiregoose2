const {Schema, model, SchemaTypes} = require('mongoose');
require('mongoose-type-url');
const {languages, categories} = require('../../config');

const validateTitle = {
  message: 'description or image is required',
  validator: function() {
    return !!(this.image || this.description);
  }
};

const schema = new Schema(
  {
    title: {type: String, required: true, minlength: [6], maxlength: [128], validate: validateTitle},
    image: {type: SchemaTypes.Url},
    description: {type: String, minlength: [15], maxlength: [256]},
    published: {type: Date, required: true},
    link: {type: SchemaTypes.Url, required: true},
    lastHit: {type: Date},
    hits: {type: Number, default: 0},
    category: {type: String, enum: categories, required: true},
    lang: {type: String, enum: languages, required: true},
    // this should be {type: ObjectId, ref: 'Author'}
    // but we really need the speed, part 1 :)
    author: {type: String, maxlength: [128]},
    // this should be {type: ObjectId, ref: 'RssProvider', required: true}
    // but we really need the speed, part 2 :)
    provider: {type: String, required: true},
    // this should be {type: ObjectId, ref: 'Registration', required: true, populate: true}
    // but we really need the speed, part 3 :)
    registration: {type: ObjectId, ref: 'Registration', required: true},

    article: {type: ObjectId, ref: 'Article'}
  },
  {timestamps: true}
);

module.exports = model('Feed', schema);

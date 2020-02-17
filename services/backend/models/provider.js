const {Schema, model} = require('mongoose');
const {categories} = require('../../../src/config');

const categoryByIndex = categories.reduce((h, category, index) => ({...h, [category]: index}), {});

const schema = new Schema({
  name: {type: String, required: true, index: true, unique: true, maxlength: [64]},
  link: {type: String, required: true},
  icon: {type: String, required: true}
});

schema.methods.toJsonSafe = function() {
  return {...this.toJSON(), _id: undefined, id: this.id, category: categoryByIndex[this.category]};
};

module.exports = model('Provider', schema);

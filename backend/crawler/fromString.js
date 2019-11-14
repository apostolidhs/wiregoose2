const fs = require('fs');
const makeParser = require('./makeParser');
const parseRss = require('./parseRss');

const parser = makeParser();

module.exports = registration => {
  const file = fs.readFileSync(registration.filepath);
  return parser.parseString(file).then(rss => parseRss(rss, registration));
};

const flat = require('../helpers/flatPromise');
const makeParser = require('./makeParser');
const parseRss = require('./parseRss');

const parser = makeParser();

module.exports = async (registration, file) => {
  const [rss] = await flat(parser.parseString(file));
  const {feeds} = parseRss(rss, registration);
  return feeds;
};

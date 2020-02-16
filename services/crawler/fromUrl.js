const flat = require('../helpers/flatPromise');
const parseRss = require('./parseRss');
const makeParser = require('./makeParser');

const parser = makeParser();

module.exports = async registration => {
  const url = decodeURIComponent(registration.link);
  const [rss, error] = await flat(parser.parseURL(url));

  if (error) {
    registration.addError(error);
    return [null, error];
  }

  const result = parseRss(rss, registration);
  return [result];
};

const flat = require('../helpers/flatPromise');
const Feed = require('../models/feed');
const parseRss = require('./parseRss');
const makeParser = require('./makeParser');

const parser = makeParser();

const getStored = (docs, feeds, error) => {
  if (error && Array.isArray(error.writeErrors)) return feeds.length - error.writeErrors.length;
  return Array.isArray(docs) ? docs.length : 0;
};

module.exports = async registration => {
  const url = decodeURIComponent(registration.link);
  const [rss, error] = await flat(parser.parseURL(url));

  if (error) {
    return registration.addError(error);
  }

  const {feeds, total} = parseRss(rss, registration);
  const [docs, feedsError] = await flat(Feed.saveFeeds(feeds));

  const stats = {
    stored: getStored(docs, feeds, feedsError),
    total: total,
    accepted: feeds.length
  };
  registration.addStats(stats);
  return stats;
};

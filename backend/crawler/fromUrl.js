const dateFns = require('date-fns');
const flat = require('../helpers/flatPromise');
const Feed = require('../models/feed');
const parseRss = require('./parseRss');
const makeParser = require('./makeParser');

const parser = makeParser();

module.exports = async registration => {
  const url = decodeURIComponent(registration.link);
  const [rss, error] = await flat(parser.parseURL(url));

  if (error) {
    return registration.addError(error);
  }

  const {feeds, total} = parseRss(rss, registration);
  const [docs, feedsError] = await flat(Feed.saveFeeds(feeds));

  const hasWriteErrors = feedsError && Array.isArray(feedsError.writeErrors);
  registration.addStats({
    stored: hasWriteErrors ? feeds.length - feedsError.writeErrors.length : docs.length,
    total: total,
    accepted: feeds.length
  });
};

const Feed = require('../models/feed');
const parseFeed = require('./parser');

module.exports = (rss, registration) => {
  const feeds = rss.items.reduce((h, item) => {
    const [entry, error] = parseFeed(item, registration);
    if (error) return h;

    const {provider, lang, category, _id} = registration;
    const feed = new Feed({...entry, provider: provider.name, lang, category, registration: _id});

    const errors = feed.validateSync();
    if (errors) return h;

    return [...h, feed];
  }, []);

  return {
    feeds,
    total: rss.items.length
  };
};

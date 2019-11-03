const fs = require('fs');
const Parser = require('rss-parser');
const Feed = require('../models/feed');
const parseFeed = require('./parser');

const parser = new Parser({
  customFields: {
    item: [['media:thumbnail', 'image'], ['a10:updated', 'updated']]
  }
});

const parseRss = (rss, registration) => {
  const feeds = rss.items.reduce((h, item) => {
    const [entry, error] = parseFeed(item, registration);
    if (error) return h;

    const {provider, lang, category, _id} = registration;
    const feed = new Feed({...entry, provider: provider.name, lang, category, registration: _id});

    const errors = feed.validateSync();
    // if (registration.provider.name === 'BBC') console.log('error', errors, feed.toJSON());
    if (errors) return h;

    return [...h, feed];
  }, []);

  return {
    feeds,
    total: rss.items.length
  };
};

const crawlString = registration => {
  const file = fs.readFileSync(registration.filepath);
  return parser.parseString(file).then(rss => parseRss(rss, registration));
};

module.exports = {crawlString};

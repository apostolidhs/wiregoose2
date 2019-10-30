const fs = require('fs');
const Parser = require('rss-parser');
const parseFeed = require('./parser');

const parser = new Parser({
  customFields: {
    item: [['media:thumbnail', 'image'], ['a10:updated', 'updated']]
  }
});

const crawlString = registration => {
  const file = fs.readFileSync(registration.filepath);
  return parser.parseString(file).then(feed => feed.items.map(item => parseFeed(item, registration)));
};

module.exports = {crawlString};

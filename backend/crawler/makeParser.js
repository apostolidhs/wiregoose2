const Parser = require('rss-parser');

module.exports = () =>
  new Parser({
    customFields: {
      item: [['media:thumbnail', 'image'], ['a10:updated', 'updated']]
    },
    timeout: 10000,
    maxRedirects: 10
  });

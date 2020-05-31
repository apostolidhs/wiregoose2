const Parser = require('rss-parser');
const requestHeaders = require('../helpers/requestHeaders');

module.exports = () =>
  new Parser({
    customFields: {
      item: [
        ['media:thumbnail', 'image'],
        ['a10:updated', 'updated'],
        ['summary', 'description'],
        ['link', 'links', {keepArray: true}]
      ]
    },
    timeout: 10000,
    maxRedirects: 10,
    requestOptions: requestHeaders
  });

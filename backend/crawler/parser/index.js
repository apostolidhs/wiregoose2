const parseTitle = require('./title');
const parseImage = require('./image');
const parseDescription = require('./description');
const parsePublished = require('./published');
const parseLink = require('./link');
const parseAuthor = require('./author');

module.exports = (feed, registration) => {
  return {
    title: parseTitle(feed),
    image: parseImage(feed, registration),
    description: parseDescription(feed),
    published: parsePublished(feed),
    link: parseLink(feed),
    author: parseAuthor(feed, registration)
  };
};

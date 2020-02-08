const parseTitle = require('./title');
const parseImage = require('./image');
const parseDescription = require('./description');
const parsePublished = require('./published');
const parseLink = require('./link');
const parseAuthor = require('./author');

module.exports = (rss, registration) => {
  const link = parseLink(rss);

  if (!link) return [null, 'LINK'];

  const title = parseTitle(rss);
  const description = parseDescription(rss);

  if (!title && !description) return [null, 'CONTENT'];

  const image = parseImage(rss, registration);
  const published = parsePublished(rss);
  const author = parseAuthor(rss);

  return [
    {
      ...(link && {link}),
      ...(title && {title}),
      ...(description && {description}),
      ...(image && {image}),
      ...(published && {published}),
      ...(author && {author})
    }
  ];
};

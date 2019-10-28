const fs = require('fs');
const url = require('url');
const Parser = require('rss-parser');
const dateFns = require('date-fns');

const parser = new Parser({
  customFields: {
    item: [['media:thumbnail', 'image'], ['a10:updated', 'updated']]
  }
});

const parsePublish = ({isoDate, updated}) => {
  if (dateFns.isValid(new Date(updated))) return new Date(updated);
  if (dateFns.isValid(new Date(isoDate))) return new Date(isoDate);

  return null;
};

const {JSDOM} = require('jsdom');

const cleanWhiteSpaces = text => {
  const dom = new JSDOM(text);
  return dom.window.document.body.textContent
    .replace(/[«»]/g, '')
    .replace(/(\s)+/g, ' ')
    .trim();
};

const getAbsoluteImage = (image, domain) => {
  if (url.parse(image).hostname) return image;
  return url.resolve(domain, image);
};

const extractImage = (content, domain) => {
  const dom = new JSDOM(content);
  const imageDoms = dom.window.document.querySelectorAll('img');
  const imageUrls = Array.from(imageDoms).map(i => i.getAttribute('src'));
  const domainImageUrl = imageUrls.find(img => domain.includes(url.parse(img).hostname));
  return domainImageUrl || imageUrls[0];
};

const getImage = ({image, content, enclosure, ...rest}, {domain}) => {
  if (image && image.$ && image.$.url) {
    return image.$.url;
  }

  if (enclosure && enclosure.url) {
    return enclosure.url;
  }

  let src;

  src = content && extractImage(content, domain);
  if (src) return src;

  const contentEncoded = rest['content:encoded'];
  src = contentEncoded && extractImage(contentEncoded, domain);
  if (src) return src;

  return null;
};

const parseImage = (feed, registration) => {
  const image = getImage(feed, registration);
  if (image) return getAbsoluteImage(image, registration.domain);
  return null;
};

const parseDescription = ({contentSnippet, content}) => {
  const description = contentSnippet || content;
  if (typeof description !== 'string') return null;

  const sample = cleanWhiteSpaces(description);

  if (sample.length < 15) return null;

  return sample.substring(0, 256).trim();
};

const parseTitle = ({title}) => {
  if (!title) return null;

  const sample = cleanWhiteSpaces(title);

  if (sample.length < 6) return null;

  return sample.substring(0, 128).trim();
};

const parseAuthor = ({creator}, {domain}) => {
  if (typeof creator === 'string') {
    const text = cleanWhiteSpaces(creator);
    if (!domain.includes(text)) return text;
  }
  return null;
};

const parseFeed = (feed, registration) => {
  // console.log(feed);
  const {link} = feed;
  return {
    title: parseTitle(feed),
    image: parseImage(feed, registration),
    description: parseDescription(feed),
    published: parsePublish(feed),
    link,
    author: parseAuthor(feed, registration)
  };
};

const crawlString = registration => {
  const file = fs.readFileSync(registration.filepath);
  return parser.parseString(file).then(feed => feed.items.map(item => parseFeed(item, registration)));
};

module.exports = {crawlString};
